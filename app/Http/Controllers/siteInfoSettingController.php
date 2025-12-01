<?php

namespace App\Http\Controllers;

use App\Models\siteInfoSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class siteInfoSettingController extends Controller
{
    public function update(){
        $validator = Validator::make(request()->all(), [
            "site_name" => ["nullable"],
            "header" => ["nullable"],
            "description" => ["nullable"],
            "logo" => ["nullable", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // Only one record is allowed
        $setting = siteInfoSetting::first();

        if (!$setting) {
            $setting = new siteInfoSetting(); // create new record if not exists
        }

        // store logo
        if (request()->hasFile('logo')) {
            $logo = request()->file('logo');
            $logoName = time() . '_' . $logo->getClientOriginalName();
            $logoPath = $logo->storeAs('settings', $logoName, 'public');
        } else {
            $logoPath = $setting->logo; 
        }

        $setting->fill([
            'site_name' => request('site_name'),
            'header' => request('header'),
            'description' => request('description'),
            'logo' => $logoPath,
        ])->save();

        return response()->json([
            'message' => 'Site Info Data updated successfully.',
            'setting' => $setting
        ]);
    }

    public function show(){
        $setting = siteInfoSetting::first();

        return response()->json([
            'setting' => $setting
        ]);
    }
}
