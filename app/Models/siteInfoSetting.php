<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class siteInfoSetting extends Model
{
    protected $fillable = [
        'site_name',
        'logo',
        'header',
        'description',
    ];
}
