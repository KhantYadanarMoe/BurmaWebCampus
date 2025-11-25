<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Subtitles extends Model
{
    protected $fillable = [
        'course_outline_id',
        'subtitle',
        'video_path',
        'description',
    ];

    
    protected $table = 'subtitles'; 

    public function outline(){
        return $this->belongsTo(CourseOutline::class, 'course_outline_id');
    }

    public function course() {
        return $this->hasOneThrough(
            Courses::class,
            CourseOutline::class,
            'id',             
            'id',            
            'course_outline_id', 
            'course_id' ,
            'youtube_video_id',     
        );
    }


    public function progress(){
        return $this->hasOne(CourseProgress::class, 'subtitle_id')
            ->where('user_id', Auth::id());
    }


}
