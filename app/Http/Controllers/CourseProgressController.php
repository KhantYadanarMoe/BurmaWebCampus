<?php

namespace App\Http\Controllers;

use App\Models\CourseProgress;
use App\Models\Courses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

   public function getCourseProgress($courseId)
{
    $userId = Auth::id();

    $course = Courses::with('outlines.subtitles')->find($courseId);

    $allSubtitles = $course->outlines->flatMap(fn($o) => $o->subtitles ?? collect());
    $total = $allSubtitles->count();

    $completedSubtitles = CourseProgress::where('user_id', $userId)
        ->where('is_completed', true)
        ->whereIn('subtitle_id', $allSubtitles->pluck('id'))
        ->pluck('subtitle_id')
        ->toArray();

    $completed = count($completedSubtitles);

    $percentage = $total > 0 ? ($completed / $total) * 100 : 0;

    return response()->json([
        'course_id' => $course->id,
        'total_subtitles' => $total,
        'completed_subtitles' => $completed,
        'completed_ids' => $completedSubtitles,   // 👈 ADD THIS
        'percentage' => round($percentage),
    ]);
}


}
