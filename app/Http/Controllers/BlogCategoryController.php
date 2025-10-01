<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogCategoryController extends Controller
{
    public function store(){
        // validate all the data from frontend
        $validator = Validator::make(request()->all(), [
            "name" => ["required"],
            'is_visible' => ['nullable', 'boolean'], 
            "icon" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // store image
        $iconPath = null;
        if (request()->hasFile('icon')) {
            $icon = request()->file('icon');
            $iconName = time() . '_' . $icon->getClientOriginalName();
            $iconPath = $icon->storeAs('blog_categories', $iconName, 'public'); 
        }

        // store the rest of the data
        $categories = BlogCategory::create([
            'name' => request('name'),
            
            'visibility' => request('visibility'),
            'icon' => $iconPath, 
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Blog Category created successfully.',
            'categories' => $categories,
            'icon_url' => $iconPath ? asset('storage/' . $iconPath) : null
        ]);
    }
    
    public function index(){
        // take data from backend database
        $categories = BlogCategory::latest()->get();

        // send data to frontend
        return response()->json([
            'categories' => $categories
        ]);
    }

    public function delete(BlogCategory $category){
        $category->delete();
        return response()->json([
            'message' => 'Blog Category deleted successful!'
        ]);
    }
}
