<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = [
        'user_id',
        'subtitle_id',
        'content',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subtitle(){
        return $this->belongsTo(Subtitles::class, 'subtitle_id');
    }
}
