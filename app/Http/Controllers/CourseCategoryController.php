<?php

namespace App\Http\Controllers;

use App\Models\CourseCategories;
use Illuminate\Http\Request;
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
        // $sort = $request->query('sort', 'newest'); 
        // $query = CourseCategories::query();

        // switch ($sort) {
        //     case 'oldest':
        //         $query->orderBy('created_at', 'asc');
        //         break;
        //     case 'a-z':
        //         $query->orderBy('name', 'asc');
        //         break;
        //     case 'z-a':
        //         $query->orderBy('name', 'desc');
        //         break;
        //     case 'newest':
        //     default:
        //         $query->orderBy('created_at', 'desc');
        //         break;
        // }

        $categories = CourseCategories::latest()->get();

        // send data to frontend
        return response()->json([
            'categories' => $categories
        ]);
    }
}
