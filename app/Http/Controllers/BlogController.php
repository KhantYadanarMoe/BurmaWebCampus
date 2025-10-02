<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function store(){
        // Validate all the data from frontend
        $validator = Validator::make(request()->all(), [
            "title" => ["required"],
            "category_id" => ["required", "exists:blog_categories,id"],
            "paragraph" => ["required"],
            "visibility" => ["nullable", "boolean"], 
            "cover" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
            "detail_image_1" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
            "detail_image_2" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
        ]);

        // Failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // Handle cover image
        $coverPath = null;
        if (request()->hasFile('cover')) {
            $cover = request()->file('cover');
            $coverName = time() . '_' . $cover->getClientOriginalName();
            $coverPath = $cover->storeAs('blogs', $coverName, 'public');
        }

        // Handle detail_image_1
        $detail1Path = null;
        if (request()->hasFile('detail_image_1')) {
            $detail1 = request()->file('detail_image_1');
            $detail1Name = time() . '_' . $detail1->getClientOriginalName();
            $detail1Path = $detail1->storeAs('blogs_detail_1', $detail1Name, 'public');
        }

        // Handle detail_image_2
        $detail2Path = null;
        if (request()->hasFile('detail_image_2')) {
            $detail2 = request()->file('detail_image_2');
            $detail2Name = time() . '_' . $detail2->getClientOriginalName();
            $detail2Path = $detail2->storeAs('blogs_detail_2', $detail2Name, 'public'); // ✅ fixed
        }

        // Store blog data
        $blog = Blog::create([
            'title' => request('title'),
            'paragraph' => request('paragraph'),
            'visibility' => request('visibility'),
            'category_id' => request('category_id'), 
            'cover' => $coverPath,
            'detail_image_1' => $detail1Path,
            'detail_image_2' => $detail2Path,
        ]);

        // Return response
        return response()->json([
            'message' => 'Blog created successfully.',
            'blog' => $blog,
        ]);
    }

    public function index(){
        // take data from backend database
        $blogs = Blog::with('category')->latest()->get();

        // send data to frontend
        return response()->json([
            'blogs' => $blogs
        ]);
    }

    public function show($id){
        $blog = Blog::with('category')->findOrFail($id); // Find blog by ID

        // Check if blog exists
        if ($blog) {
            return response()->json(['blog' => $blog]);
        } else {
            // If blog not found, return a 404 with a message
            return response()->json(['message' => 'Blog not found'], 404);
        }
    }

}
