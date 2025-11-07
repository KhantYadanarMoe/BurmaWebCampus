<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // password confirmation field
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
        ]);

        Auth::login($user);

        return redirect('/'); 
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return redirect('/');
        }

        return back()->withErrors(['error' => 'Invalid credentials'])->withInput();
    }

    public function logout(){
        Auth::logout();
        return redirect()->route('login'); 
    }

    public function redirectToGoogle(){
        return Socialite::driver('google')->redirect();
    }


    public function handleGoogleCallback(){
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]);

            Auth::login($user);
            return redirect('/');  
        } catch (\Exception $e) {
            dd($e);  
        }
    }

    public function index(Request $request){
        $sort = $request->query('sort', 'newest'); // Default to 'newest' if no data is provided
        $query = User::query();

        // Apply sorting based on the requested sort option
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

        $users = $query->get();

        // Send data to frontend
        return response()->json([
            'message' => 'Users retrieved successfully.',
            'users' => $users
        ]);
    }

    public function updateUser(User $user){
        $validator = Validator::make(request()->all(), [
            "firstName" => ["required"],
            "lastName" => ["required"],
            "email" => ["required"],
            "phone" => ["nullable", "numeric"],
            "DoB" => ["nullable"],
            "bio" => ["nullable"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        $name = trim(request('firstName') . ' ' . request('lastName'));

        // Log for debugging
        Log::info('Updating user with data:', [
            'name' => $name,
            'email' => request('email'),
            'phone' => request('phone'),
            'DoB' => request('DoB'),
            'bio' => request('bio'),
        ]);

        $user->update([
            'name' => $name,
            'email' => request('email'),
            'phone' => request('phone'),
            'DoB' => request('DoB'),
            'bio' => request('bio'),
        ]);
        return response()->json([
            'message' => 'User data updated successfully.',
            'user' => $user
        ]);
    }

    public function changePassword(Request $request, $id){
        $request->validate([
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:8|confirmed',
        ]);

        $user = User::findOrFail($id);

        if ($request->user()->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Verify current password
        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 422);
        }

        // Update password
        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function ban(Request $request, $id){
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->banned = $request->banned; // Set banned to 1
        $user->save();

       return response()->json(['message' => $user->banned ? 'User banned successfully' : 'User re-activated successfully', 'user' => $user]);
    }
}
