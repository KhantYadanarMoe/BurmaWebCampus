<?php

namespace App\Http\Controllers;

use App\Models\securitySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class securitySettingController extends Controller
{
    public function update(){
        $validator = Validator::make(request()->all(), [
            "password_length" => ["nullable"],
            "session_timeout" => ["nullable"],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // Only one record is allowed
        $setting = securitySetting::first();

        if (!$setting) {
            $setting = new securitySetting(); // create new record if not exists
        }

        $setting->fill([
            'password_length' => request('password_length'),
            'session_timeout' => request('session_timeout'),
        ])->save();

        return response()->json([
            'message' => 'Security settings updated successfully.',
            'setting' => $setting
        ]);
    }

    public function show(){
        $setting = securitySetting::first();

        return response()->json([
            'setting' => $setting
        ]);
    }
}
