<?php

namespace App\Http\Controllers;

use App\Models\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscribeController extends Controller
{
    public function store(){
        // validate all the data from frontend
        $validator = Validator::make(request()->all(), [
            "email" => ["required"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // store the rest of the data
        $subscribes = Subscribe::create([
            'email' => request('email'),
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Subscribed successfully.',
            'subscribes' => $subscribes,
        ]);
    }

    public function index(Request $request){
        $sort = $request->query('sort', 'newest'); // Default to 'newest' if no data is provided
        $query = Subscribe::query();

        // Apply sorting based on the requested sort option
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'a-z':
                $query->orderBy('email', 'asc');
                break;
            case 'z-a':
                $query->orderBy('email', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $subscribes = $query->get();

        // Send data to frontend
        return response()->json([
            'subscribes' => $subscribes
        ]);
    }

}
