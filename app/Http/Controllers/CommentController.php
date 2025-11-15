<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request)
{
    // Validate the incoming data from frontend
    $validator = Validator::make($request->all(), [
        'subtitle_id' => ['required', 'exists:subtitles,id'],
        'content' => ['required', 'string', 'max:1000'],
    ]);

    // Check for failed validation
    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()->messages(),
        ], 422);
    }

    // Create the comment record in the database
    $comment = Comments::create([
        'user_id' => Auth::id(), // assuming the user is authenticated
        'subtitle_id' => $request->subtitle_id,
        'content' => $request->input('content'),
    ]);

    // Return a success response
    return response()->json([
        'message' => 'Comment posted successfully.',
        'comment' => $comment,
    ]);
}
}
