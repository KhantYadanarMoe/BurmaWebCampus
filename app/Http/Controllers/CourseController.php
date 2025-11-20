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

    $course = Courses::create([
        'title' => $request->input('title', ''),
        'category_id' => $request->input('category', 1),
        'price' => $request->input('price', 0),
        'description' => $request->input('description', ''),
        'outcomes' => $request->input('outcomes', ''),
        'image'   => $imagePath, 
    ]);

    foreach ($details as $unit) {
        $outline = $course->outlines()->create([
            'title' => $unit['title'] ?? '',
        ]);

        foreach ($unit['sublectures'] ?? [] as $sub) {
            $youtubeId = $this->extractYoutubeId($sub['video_url'] ?? '');

            $outline->subtitles()->create([
                'subtitle' => $sub['subtitle'] ?? '',
                'video_path' => $youtubeId,  // store YouTube video ID
            ]);
        }
    }

    foreach ($quiz as $q) {
        $quizModel = $course->quizzes()->create([
            'question' => $q['question'] ?? '',
        ]);

        foreach ($q['options'] ?? [] as $opt) {
            $quizModel->options()->create([
                'option_text' => $opt['text'] ?? '',
                'is_correct' => $opt['correct'] ?? false,
            ]);
        }
    }

    return response()->json(['success' => true]);
}

    private function extractYoutubeId($url){
        if (!$url) return null;

        // Match different YouTube URL formats
        preg_match('/(youtu\.be\/|v=|embed\/)([^&?\/]+)/', $url, $matches);

        return $matches[2] ?? null;
    }

 
    public function index(Request $request){
        // Get the sort option from query params, default to 'newest'
        $sort = $request->query('sort', 'newest');

        // Start the query with relationships eager-loaded
        $query = Courses::with([
            'category',           
            'outlines.subtitles',
            'quizzes.options'  ,
            'purchases'   
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

    public function delete(Courses $course){
        $course->delete();
        return response()->json([
            'message' => 'Course deleted successful!'
        ]);
    }
}
