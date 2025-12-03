<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class emailSetting extends Model
{
     protected $fillable = ['admin_email', 'sender_name'];
}
