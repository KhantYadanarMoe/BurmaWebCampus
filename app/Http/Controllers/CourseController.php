<?php

namespace App\Http\Controllers;

use App\Models\CourseOutline;
use App\Models\Courses;
use App\Models\Quiz;
use App\Models\QuizOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;


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

    $totalSeconds = 0;

    foreach ($course->outlines as $outline) {
        foreach ($outline->subtitles as $subtitle) {
            if ($subtitle->video_path) {
                $totalSeconds += $this->getYoutubeVideoDuration($subtitle->video_path);
            }
        }
    }

    $course->total_seconds = $totalSeconds;
    $course->save();

    return response()->json(['success' => true]);
}

    private function extractYoutubeId($url){
        if (!$url) return null;

        // Match different YouTube URL formats
        preg_match('/(youtu\.be\/|v=|embed\/)([^&?\/]+)/', $url, $matches);

        return $matches[2] ?? null;
    }

    public function index(Request $request){
        $sort = $request->query('sort', 'newest');

        $userId = Auth::id(); 

        $query = Courses::with([
            'category',
            'outlines.subtitles.progress',
            'quizzes.options',
            'purchases'
        ])->withCount([
            'purchases',

        ]);

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

        $courses = $query->get();

        // Calculate progress percentage per course
        $courses->map(function ($course) use ($userId)  {
            $totalSubtitles = $course->outlines->flatMap(fn($o) => $o->subtitles)->count();

            if ($totalSubtitles === 0) {
                $course->total_completed_users = 0;
                $course->progress_percentage = 0;
                return $course;
            }

            $totalCompletedUsers = DB::table('course_progress')
            ->join('subtitles', 'course_progress.subtitle_id', '=', 'subtitles.id')
            ->join('course_outlines', 'subtitles.course_outline_id', '=', 'course_outlines.id') // correct column name
            ->where('course_outlines.course_id', $course->id)
            ->where('course_progress.is_completed', true)
            ->select('course_progress.user_id', DB::raw('COUNT(course_progress.id) as completed_count'))
            ->groupBy('course_progress.user_id')
            ->having('completed_count', '=', $totalSubtitles)
            ->count();

            $course->total_completed_users = $totalCompletedUsers;

            $completedSubtitles = DB::table('course_progress')
                ->whereIn('subtitle_id', $course->outlines->flatMap(fn($o) => $o->subtitles)->pluck('id'))
                ->where('user_id', $userId)
                ->where('is_completed', true)
                ->count();

            $course->progress_percentage = round(($completedSubtitles / $totalSubtitles) * 100);
            $course->total_hours = round($course->total_seconds / 3600, 2);

            return $course;
        });

        return response()->json([
            'courses' => $courses
        ]);
    }

    private function getYoutubeVideoDuration(string $videoId): int{
        if (empty($videoId)) {
            return 0;
        }

        $response = Http::timeout(10)->get(
            'https://www.googleapis.com/youtube/v3/videos',
            [
                'part' => 'contentDetails',
                'id'   => $videoId,
                'key'  => config('services.youtube.key'),
            ]
        );

        if ($response->failed()) {
            return 0; 
        }

        $data = $response->json();

        if (empty($data['items'][0]['contentDetails']['duration'])) {
            return 0;
        }

        $duration = $data['items'][0]['contentDetails']['duration'];

        preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/', $duration, $matches);

        $hours   = (int) ($matches[1] ?? 0);
        $minutes = (int) ($matches[2] ?? 0);
        $seconds = (int) ($matches[3] ?? 0);

        return ($hours * 3600) + ($minutes * 60) + $seconds;
    }

    public function show($slug){
        $title = str_replace('-', ' ', strtolower($slug));

        $course = Courses::with([
            'category',
            'outlines.subtitles',
            'quizzes.options'
        ])
        ->withCount('purchases')
        ->whereRaw('LOWER(REPLACE(title, "-", " ")) = ?', [$title])
        ->first();

        if ($course) {
            $course->total_hours = round($course->total_seconds / 3600, 2);
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
