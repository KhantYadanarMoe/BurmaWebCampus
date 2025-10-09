<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function index(Request $request){
        $sort = $request->query('sort', 'newest'); // Default to 'newest' if no data is provided
        $query = Blog::query();

        // Apply sorting based on the requested sort option
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'a-z':
                $query->orderBy('title', 'asc');
                break;
            case 'z-a':
                $query->orderBy('title', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $blogs = $query->with('category')->get();

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

     public function update(Blog $blog){
        $validator = Validator::make(request()->all(), [
            "title" => ["required"],
            "category_id" => ["required", "exists:blog_categories,id"],
            "paragraph" => ["required"],
            "visibility" => ["nullable", "boolean"], 
            "cover" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
            "detail_image_1" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
            "detail_image_2" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // Store new images if they exist
        $coverPath = $blog->cover;

        if (request()->hasFile('cover')) {
            // Optional: delete old image
            if ($coverPath && Storage::disk('public')->exists($coverPath)) {
                Storage::disk('public')->delete($coverPath);
            }

            $cover = request()->file('cover');
            $coverName = time() . '_' . $cover->getClientOriginalName();
            $coverPath = $cover->storeAs('blogs', $coverName, 'public');
        }

        // Store new images if they exist
        $detail1Path = $blog->detail_image_1;

        if (request()->hasFile('detail_image_1')) {
            // Optional: delete old image
            if ($detail1Path && Storage::disk('public')->exists($detail1Path)) {
                Storage::disk('public')->delete($detail1Path);
            }

            $detail1 = request()->file('detail_image_1');
            $detail1Name = time() . '_' . $detail1->getClientOriginalName();
            $detail1Path = $detail1->storeAs('blogs_details_1', $detail1Name, 'public');
        }

        $detail2Path = $blog->detail_image_2;

        if (request()->hasFile('detail_image_2')) {
            // Optional: delete old image
            if ($detail2Path && Storage::disk('public')->exists($detail2Path)) {
                Storage::disk('public')->delete($detail2Path);
            }

            $detail2 = request()->file('detail_image_2');
            $detail2Name = time() . '_' . $detail2->getClientOriginalName();
            $detail2Path = $detail2->storeAs('blogs_details_2', $detail2Name, 'public');
        }

        $blog->update([
            'title' => request('title'),
            'category_id' => request('category_id'), 
            'paragraph' => request('paragraph'),
            'visibility' => request('visibility'),
            'cover' => $coverPath,
            'detail_image_1' => $detail1Path,
            'detail_image_2' => $detail2Path,
        ]);

        return response()->json([
            'message' => 'Blog updated successfully.',
            'blog' => $blog,
        ]);
    }

    public function incrementView($id){
        $blog = Blog::find($id);

        if ($blog) {
            $blog->increment('view');
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Blog not found'], 404);
    }

    public function delete(Blog $blog){
        $blog->delete();
        return response()->json([
            'message' => 'Blog deleted successful!'
        ]);
    }
}
