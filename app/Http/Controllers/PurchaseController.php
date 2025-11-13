<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
    public function store(){
        // validate all the data from frontend
        $validator = Validator::make(request()->all(), [
            "invoice_no" => ["required"],
            "name" => ["required"],
            "email" => ["required"],
            "phone" => ["nullable"],
            "payment_method" => ["required"],
            "total_price" => ["required"],
            "course_id" => ["required", "exists:courses,id"], 
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        $course = Courses::find(request('course_id'));

        // store the rest of the data
        $purchases = Purchase::create([
            'invoice_no' => request('invoice_no'),
            'name' => request('name'),
            'email' => request('email'),
            'phone' => request('phone'),
            'payment_method' => request('payment_method'),
            'total_price' => request('total_price'),
            'course_id' => $course->id, 
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Course purchased successfully.',
            'purchases' => $purchases,
        ]);
    }
}
