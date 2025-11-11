<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseOutline extends Model
{
    protected $fillable = ['course_id', 'title', 'sublectures'];

    protected $casts = [
        'sublectures' => 'array', // Auto-convert JSON to array
    ];

    public function course()
    {
        return $this->belongsTo(Courses::class, 'course_id');
    }
}


