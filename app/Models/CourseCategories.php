<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseCategories extends Model
{
    protected $fillable = [
        'name',
        'icon',
        'is_visible',
    ];

    public function courses()
    {
        return $this->hasMany(Courses::class, 'category_id');
    }
}
