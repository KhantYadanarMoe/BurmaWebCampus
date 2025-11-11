<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseOutline extends Model
{
    protected $fillable = ['course_id', 'title', 'subtitles'];

    protected $casts = [
        'subtitles' => 'array', // Auto-convert JSON to array
    ];

    public function course()
    {
        return $this->belongsTo(Courses::class, 'course_id');
    }

    public function subtitles()
    {
        return $this->hasMany(Subtitles::class, 'course_outline_id');
    }

    
}


