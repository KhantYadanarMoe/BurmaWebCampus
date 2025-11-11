<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['course_id', 'question'];

     public function course()
    {
        return $this->belongsTo(Courses::class, 'course_id');
    }

    public function options()
    {
        return $this->hasMany(QuizOption::class, 'quiz_id');
    }
}

