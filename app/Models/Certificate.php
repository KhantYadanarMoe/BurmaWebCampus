<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = ['user_id', 'course_id', 'image_path'];

    public function course(){
        return $this->belongsTo(Courses::class);
    }

}
