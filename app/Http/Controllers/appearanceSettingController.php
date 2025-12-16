<?php

namespace App\Http\Controllers;

use App\Models\AppearanceSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class appearanceSettingController extends Controller
{
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "google_font_url" => ["nullable", "url"],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        $setting = AppearanceSetting::first() ?? new appearanceSetting();

        $googleFontUrl = $request->google_font_url;
        $fontFamily = $this->extractFontFamily($googleFontUrl);

        $setting->google_font_url = $googleFontUrl;
        $setting->google_font_family = $fontFamily;
        $setting->save();

        return response()->json([
            'message' => 'Font settings updated successfully.',
            'setting' => $setting
        ]);
    }

    private function extractFontFamily($url)
    {
        if (!$url) return null;

        // match family=Poppins or family=Open+Sans
        if (preg_match('/family=([^:&]+)/', $url, $match)) {
            return str_replace('+', ' ', $match[1]);
        }

        return null;
    }

    public function show(){
        $setting = appearanceSetting::first();

        return response()->json([
            'setting' => $setting
        ]);
    }
}
