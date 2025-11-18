<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    // Course.php
    protected $fillable = ['title','category_id','price','description','outcomes','image'];

    public function category(){
        return $this->belongsTo(CourseCategories::class, 'category_id');
    }

    public function outlines(){
        return $this->hasMany(CourseOutline::class, 'course_id'); // specify foreign key
    }

    public function quizzes(){
        return $this->hasMany(Quiz::class, 'course_id'); // specify course_id explicitly
    }

    public function purchases(){
        return $this->hasMany(Purchase::class, 'course_id');
    }

    public function users(){
        return $this->belongsToMany(User::class)->withPivot('completed')->withTimestamps();
    }
}





