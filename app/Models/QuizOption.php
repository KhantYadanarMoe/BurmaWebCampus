<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizOption extends Model
{
    protected $fillable = ['quiz_id', 'option_text', 'is_correct'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }
}

