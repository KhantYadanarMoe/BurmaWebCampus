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

    public function index(){
        $subscribes = Subscribe::latest()->get();

        return response()->json([
            'subscribes' => $subscribes
        ]);
    }
}
