<?php

namespace App\Http\Controllers;

use App\Models\CourseOutline;
use App\Models\Courses;
use App\Models\Quiz;
use App\Models\QuizOption;
use Illuminate\Http\Request;

class CourseController extends Controller
{
 public function store(Request $request){
    // 1️⃣ Decode JSON arrays
    $details = json_decode($request->input('details', '[]'), true);
    $quiz = json_decode($request->input('quiz', '[]'), true);

    // 2️⃣ Save main course
    $course = Courses::create([
        'title' => $request->input('title', ''),
        'category_id' => $request->input('category', 1), // make sure this is ID
        'price' => $request->input('price', 0),
        'description' => $request->input('description', ''),
        'outcomes' => $request->input('outcomes', ''),
    ]);

    
    foreach ($details as $unit) {
    // Create the outline (Unit)
    $outline = $course->outlines()->create([
        'title' => $unit['title'] ?? '',
    ]);

    // Now add each subtitle (sublecture/video) under this outline
    foreach ($unit['sublectures'] ?? [] as $sub) {
        $outline->subtitles()->create([
            'subtitle' => $sub['subtitle'] ?? '',
            'video_path' => $sub['video_path'] ?? null, 
        ]);
    }
}



    // 4️⃣ Save quizzes
    foreach ($quiz as $q) {
        $quizModel = $course->quizzes()->create([
            'question' => $q['question'] ?? ''
        ]);

        foreach ($q['options'] ?? [] as $opt) {
            $quizModel->options()->create([
                'option_text' => $opt['text'] ?? '',
                'is_correct' => $opt['correct'] ?? false
            ]);
        }
    }

    return response()->json(['success' => true]);
}




}
