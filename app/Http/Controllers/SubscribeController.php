<?php

namespace App\Http\Controllers;

use App\Models\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'user_id' => Auth::check() ? Auth::id() : null,
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Subscribed successfully.',
            'subscribes' => $subscribes,
        ]);
    }

   public function index(Request $request){
        $sort = $request->query('sort', 'newest'); 

        $query = Subscribe::with('user'); 

        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;

            case 'a-z':
                // Sort by user name ascending
                $query->join('users', 'subscribes.user_id', '=', 'users.id')
                    ->orderBy('users.name', 'asc')
                    ->select('subscribes.*');
                break;

            case 'z-a':
                // Sort by user name descending
                $query->join('users', 'subscribes.user_id', '=', 'users.id')
                    ->orderBy('users.name', 'desc')
                    ->select('subscribes.*');
                break;

            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $subscribes = $query->get();

        return response()->json([
            'subscribes' => $subscribes
        ]);
    }
}
