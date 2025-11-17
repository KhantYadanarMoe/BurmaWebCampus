<?php

namespace App\Http\Controllers;

use App\Models\CourseCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CourseCategoryController extends Controller
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

        // store icon
        $iconPath = null;
        if (request()->hasFile('icon')) {
            $icon = request()->file('icon');
            $iconName = time() . '_' . $icon->getClientOriginalName();
            $iconPath = $icon->storeAs('course_categories', $iconName, 'public'); 
        }

        // store the rest of the data
        $categories = CourseCategories::create([
            'name' => request('name'),
            'visibility' => request('visibility'),
            'icon' => $iconPath, 
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Course Category created successfully.',
            'categories' => $categories,
            'icon_url' => $iconPath ? asset('storage/' . $iconPath) : null
        ]);
    }

    public function index(Request $request){
        $sort = $request->query('sort', 'newest'); 
        $query = CourseCategories::query();

        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'a-z':
                $query->orderBy('name', 'asc');
                break;
            case 'z-a':
                $query->orderBy('name', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $categories = $query->get();

        // send data to frontend
        return response()->json([
            'categories' => $categories
        ]);
    }

    public function show($id){
        $category = CourseCategories::find($id); // Find category by ID

        // Check if category exists
        if ($category) {
            return response()->json(['category' => $category]);
        } else {
            // If category doesn't found, return a 404 with a message
            return response()->json(['message' => 'Category not found.'], 404);
        }
    }

    public function update(CourseCategories $category){
        $validator = Validator::make(request()->all(), [
            "name" => ["required"],
            "image" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        $iconPath = null;
        if (request()->hasFile('icon')) {
            $icon = request()->file('icon');
            $iconName = time() . '_' . $icon->getClientOriginalName();
            $iconPath = $icon->storeAs('course_categories', $iconName, 'public'); 
        }else {
            // Retain the old icon if no new icon is provided
            $iconPath = $category->icon;
        }

        Log::info(request()->all()); // Log all incoming data

        $category->update([
            'icon' => $iconPath, 
            'name' => request('name'),
        ]);
        return response()->json([
            'message' => 'Course Category updated successfully.',
            'category' => $category
        ]);
    }

    public function updateVisibility(Request $request, $id){
        $request->validate([
            'is_visible' => 'required|boolean',
        ]);

        $category = CourseCategories::findOrFail($id);
        $category->is_visible = $request->is_visible;
        $category->save();

        return response()->json(['success' => true]);
    }

    public function delete(CourseCategories $category){
        $category->delete();
        return response()->json([
            'message' => 'Course Category deleted successful!'
        ]);
    }
}
