<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseProgress extends Model
{
    protected $fillable = ['user_id', 'subtitle_id', 'is_completed'];
}
