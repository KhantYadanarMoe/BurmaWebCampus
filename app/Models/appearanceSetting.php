<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class appearanceSetting extends Model
{
    protected $fillable = ['google_font_url', 'google_font_family'];
    public $timestamps = false;
}
