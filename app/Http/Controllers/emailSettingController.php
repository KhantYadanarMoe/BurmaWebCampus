<?php

namespace App\Http\Controllers;

use App\Models\emailSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class emailSettingController extends Controller
{
    public function update(){
        $validator = Validator::make(request()->all(), [
            "admin_email" => ["nullable"],
            "sender_name" => ["nullable"],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // Only one record is allowed
        $setting = emailSetting::first();

        if (!$setting) {
            $setting = new emailSetting(); // create new record if not exists
        }

        $setting->fill([
            'admin_email' => request('admin_email'),
            'sender_name' => request('sender_name'),
        ])->save();

        return response()->json([
            'message' => 'Email settings updated successfully.',
            'setting' => $setting
        ]);
    }

    public function show(){
        $setting = emailSetting::first();

        return response()->json([
            'setting' => $setting
        ]);
    }
}
