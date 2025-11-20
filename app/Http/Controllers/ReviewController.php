<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(){
        // validate all the data from frontend
        $validator = Validator::make(request()->all(), [
            "rating" => ["required"],
            "name" => ["required"],
            "course_id" => ["required"],
            "review" => ["string", "max:1000"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // store the rest of the data
        $reviews = Review::create([
            'rating' => request('rating'),
            'name' => request('name'),
            'course_id' => request('course_id'),
            'review' => request('review'),
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Review sent successfully.',
            'reviews' => $reviews,
        ]);
    }

    public function index(Request $request){
        $sort = $request->query('sort', 'newest'); 
        $query = Review::with('course');

        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'a-z':
                $query->orderBy('name', 'asc');
                break;
            case 'z-a':
                $query->orderBy('name', 'desc');
                break;
                case '1-5':
                $query->orderBy('rating', 'asc');
                break;
            case '5-1':
                $query->orderBy('rating', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $reviews = $query->get();

        // send data to frontend
        return response()->json([
            'reviews' => $reviews
        ]);
    }

    public function mark(Request $request, $id){
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        $review->marked = $request->marked; 
        $review->save();

        return response()->json(['message' => 'Review marked successfully']);
    }

    public function publish(Request $request, $id){
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        $review->visibility = $request->visibility; 
        $review->save();

        return response()->json(['message' => 'Review published successfully']);
    }
}
