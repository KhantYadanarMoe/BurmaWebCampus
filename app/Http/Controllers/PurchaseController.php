<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
    public function store(){
        $validator = Validator::make(request()->all(), [
            "invoice_no" => ["required"],
            "name" => ["required"],
            "email" => ["required"],
            "phone" => ["nullable"],
            "payment_method" => ["required"],
            "total_price" => ["required"],
            "course_id" => ["required", "exists:courses,id"], 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        $course = Courses::find(request('course_id'));
        $user = Auth::user();

        $purchases = Purchase::create([
            'invoice_no' => request('invoice_no'),
            'name' => request('name'),
            'email' => request('email'),
            'phone' => request('phone'),
            'payment_method' => request('payment_method'),
            'total_price' => request('total_price'),
            'course_id' => $course->id, 
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Course purchased successfully.',
            'purchases' => $purchases,
        ]);
    }

    public function index(Request $request){
        $sort = $request->query('sort', 'newest'); // Default to 'newest'
        $query = Purchase::with('course'); // <- fixed

        // Apply sorting
        if ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $purchases = $query->get();

        return response()->json([
            'purchases' => $purchases
        ]);
    }

    public function purchaseHistory() {
        $user = Auth::user();
        $purchases = Purchase::with('course')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'purchases' => $purchases
        ]);
    }


}
