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
    $details = json_decode($request->input('details', '[]'), true);
    $quiz = json_decode($request->input('quiz', '[]'), true);

     $imagePath = null;
     if ($request->hasFile('image')) {
         $file = $request->file('image');
         if ($file->isValid()) {
             $imagePath = $file->store('course_images', 'public');
         }
     }

    // 2️⃣ Save main course
    $course = Courses::create([
        'title' => $request->input('title', ''),
        'category_id' => $request->input('category', 1), // make sure this is ID
        'price' => $request->input('price', 0),
        'description' => $request->input('description', ''),
        'outcomes' => $request->input('outcomes', ''),
        'image'   => $imagePath, 
    ]);

    
    foreach ($details as $unit) {
    // Create the outline (Unit)
    $outline = $course->outlines()->create([
        'title' => $unit['title'] ?? '',
    ]);

    foreach ($unit['sublectures'] ?? [] as $sub) {
    $videoPath = null;

    // Check if frontend uploaded a file for this subtitle
    if (!empty($sub['upload_key']) && $request->hasFile($sub['upload_key'])) {
            $file = $request->file($sub['upload_key']);
            if ($file->isValid()) {
                $videoPath = $file->store('videos', 'public'); // stored in storage/app/public/videos
            }
        }

        $outline->subtitles()->create([
            'subtitle' => $sub['subtitle'] ?? '',
            'video_path' => $videoPath,
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

    public function index(Request $request)
    {
        // Fetch all courses with related models
        $courses = Courses::with([
            'category',           // course category
            'outlines.subtitles', // outlines and their subtitles
            'quizzes.options'     // quizzes and their options
        ])->latest()->get();

        // Return as JSON directly
        return response()->json([
            'courses' => $courses
        ]);
    }


public function show($id){
        $course = Courses::with('category', 'outlines.subtitles', // outlines and their subtitles
            'quizzes.options' )->findOrFail($id); 

        if ($course) {
            return response()->json(['course' => $course]);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }


}
