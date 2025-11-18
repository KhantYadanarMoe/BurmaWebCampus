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

    
    public function index(Request $request){
        // Get the sort option from query params, default to 'newest'
        $sort = $request->query('sort', 'newest');

        // Start the query with relationships eager-loaded
        $query = Courses::with([
            'category',           
            'outlines.subtitles',
            'quizzes.options'     
        ])->withCount([
    'purchases', 
    'purchases as certified_count' => function ($query) {
        $query->where('completed', true); 
    }
]);


        // Apply sorting
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'a-z':
                $query->orderBy('title', 'asc');
                break;
            case 'z-a':
                $query->orderBy('title', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        // Execute query
        $courses = $query->get();

        // Return as JSON
        return response()->json([
            'courses' => $courses
        ]);
    }

    public function show($id){
        $course = Courses::with('category', 'outlines.subtitles', // outlines and their subtitles
            'quizzes.options' )->withCount('purchases')->findOrFail($id); 

        if ($course) {
            return response()->json(['course' => $course]);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }


}
