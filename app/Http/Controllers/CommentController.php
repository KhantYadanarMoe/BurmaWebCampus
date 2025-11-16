<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'subtitle_id' => ['required', 'exists:subtitles,id'],
            'content' => ['required', 'string', 'max:1000'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages(),
            ], 422);
        }

        $comment = Comments::create([
            'user_id' => Auth::id(), // assuming the user is authenticated
            'subtitle_id' => $request->subtitle_id,
            'content' => $request->input('content'),
        ]);

        return response()->json([
            'message' => 'Comment posted successfully.',
            'comment' => $comment,
        ]);
    }

    public function index(){
        $comments = Comments::with(['user:id,name,image', 'subtitle:id,subtitle'])
                        ->latest()->get();

        return response()->json([
            'comments' => $comments
        ]);
    }

    public function getBySubtitle($subtitleId){
        $comments = Comments::with(['user:id,name,image', 'subtitle:id,subtitle'])
            ->where('subtitle_id', $subtitleId)
            ->latest()
            ->get();

        return response()->json([
            'comments' => $comments
        ]);
    }

}
