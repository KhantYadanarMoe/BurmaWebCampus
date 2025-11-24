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
            'subtitle_id' => ['required', 'exists:subtitle,id'],
            'content' => ['required', 'string', 'max:1000'],
            'parent_id' => ['nullable', 'exists:comments,id'],
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
            'parent_id' => $request->input('parent_id'),
        ]);

        return response()->json([
            'message' => $request->parent_id ? 'Reply posted successfully.' : 'Comment posted successfully.',
            'comment' => $comment,
        ]);
    }

    public function index(){
        $comments = Comments::with([
    'user:id,name,image',
    'subtitle:id,subtitle,course_outline_id',
    'subtitle.outline.course'
])->latest()->get();
                        

        return response()->json([
            'comments' => $comments
        ]);
    }

   public function getBySubtitle($subtitleId){
    $comments = Comments::with([
        'user:id,name,image', 
        'replies.user:id,name,image', 
        'replies.replies.user:id,name,image', 
        'subtitle:id,subtitle'
    ])
    ->where('subtitle_id', $subtitleId)
    ->whereNull('parent_id') 
    ->orderBy('created_at', 'asc')
    ->get();

    return response()->json([
        'comments' => $comments
    ]);
}


}
