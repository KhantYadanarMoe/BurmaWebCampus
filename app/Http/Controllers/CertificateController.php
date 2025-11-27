<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'image' => 'required|image',
            'course_id' => 'required|integer',
        ]);

        $user = $request->user();

        // Save the image
        $path = $request->file('image')->store('certificates', 'public');

        // Save DB record
        $certificate = Certificate::create([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
            'image_path' => $path,
        ]);

        return response()->json([
            'success' => true,
            'file_url' => asset('storage/' . $path),
        ]);
    }
}
