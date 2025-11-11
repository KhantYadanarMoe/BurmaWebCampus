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
}
