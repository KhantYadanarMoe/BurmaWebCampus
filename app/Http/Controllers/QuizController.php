<?php

namespace App\Http\Controllers;

use App\Models\QuizOption;
use App\Models\QuizResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'answers' => 'required|array',
        ]);

        $userId = Auth::id();
        $courseId = $request->input('course_id');
        $answers = $request->input('answers'); // [quiz_id => option_id]

        $score = 0;

        foreach ($answers as $quizId => $optionId) {
            $option = QuizOption::where('id', $optionId)
                ->where('quiz_id', $quizId)
                ->first();

            if ($option && $option->is_correct) {
                $score++;
            }
        }

        $quizResult = QuizResult::updateOrCreate(
            [
                'user_id' => $userId,
                'course_id' => $courseId
            ],
            ['score' => $score]
        );

        return response()->json([
            'message' => 'Quiz submitted successfully',
            'score' => $score
        ]);
    }
}
