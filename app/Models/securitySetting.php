<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class securitySetting extends Model
{
    protected $fillable = ['password_length', 'session_timeout'];
}
