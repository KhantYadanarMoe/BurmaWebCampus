<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = [
        'user_id',
        'subtitle_id',
        'content',
        'parent_id'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subtitle(){
        return $this->belongsTo(Subtitles::class, 'subtitle_id');
    }

    public function replies()
{
    return $this->hasMany(Comments::class, 'parent_id')
                ->with('user')
                ->orderBy('created_at', 'asc');
}


    public function parent(){
        return $this->belongsTo(Comments::class, 'parent_id');
    }

}
