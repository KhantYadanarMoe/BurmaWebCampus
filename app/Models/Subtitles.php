<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subtitles extends Model
{
    protected $fillable = [
        'course_outline_id',
        'subtitle',
        'video_path',
        'description',
    ];

    public function outline()
    {
        return $this->belongsTo(CourseOutline::class, 'course_outline_id');
    }

    // Subtitles.php
public function course() {
    return $this->hasOneThrough(
        Courses::class,
        CourseOutline::class,
        'id',             // Foreign key on CourseOutline table...
        'id',             // Foreign key on Courses table...
        'course_outline_id', // Local key on Subtitles table
        'course_id'       // Local key on CourseOutline table
    );
}

}
