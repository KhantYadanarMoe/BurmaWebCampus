<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //

    protected $fillable = [
        'title',
        'cover',
        'detail_image_1',
        'detail_image_2',
        'category_id',
        'paragraph',
        'visibility',
        'view',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Relationship: a blog belongs to one category
    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }
}
