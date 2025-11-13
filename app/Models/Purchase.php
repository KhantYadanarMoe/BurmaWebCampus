<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = ['invoice_no','name','email','phone','payment_method','total_price', 'course_id'];

    public function course() {
        return $this->belongsTo(Courses::class);
    }

}
