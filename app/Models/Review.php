<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'rating', 'name', 'course_id', 'review'
    ];

    public function course(){
        return $this->belongsTo(Courses::class);
    }
}
