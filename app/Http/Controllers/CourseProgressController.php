<?php

namespace App\Http\Controllers;

use App\Models\CourseProgress;
use App\Models\Courses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseProgressController extends Controller
{
    public function updateProgress(Request $request){
        $request->validate([
            'subtitle_id' => 'required|exists:subtitles,id',
        ]);

        $progress = CourseProgress::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'subtitle_id' => $request->subtitle_id,
            ],
            [
                'is_completed' => true,
            ]
        );

        return response()->json(['message' => 'Progress saved.']);
    }



}
