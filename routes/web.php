<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SubscribeController;
use App\Models\Contact;
use App\Models\Subscribe;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/api/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->get('/api/user', fn(Request $req) => $req->user());
Route::post('/api/login', [AuthController::class, 'login']);

Route::get('/api/users', [AuthController::class, 'index']);

Route::get('/api/blog/categories', [BlogCategoryController::class, 'index']);
Route::post("/api/blog/category/create", [BlogCategoryController::class, 'store']);
 Route::put('/api/blog/category/{id}/visibility', [BlogCategoryController::class, 'updateVisibility']);
Route::get('/api/blog/category/{id}', [BlogCategoryController::class, 'show']);
Route::put('/api/blog/category/{category}', [BlogCategoryController::class, 'update']);
Route::delete('/api/blog/category/{category}', [BlogCategoryController::class, 'delete']);

Route::get('/api/blogs', [BlogController::class, 'index']);
Route::post("/api/blog/create", [BlogController::class, 'store']);
Route::get('/api/blog/{id}', [BlogController::class, 'show']);
Route::put('/api/blog/{blog}', [BlogController::class, 'update']);
Route::post('/api/blog/{id}/view', [BlogController::class, 'incrementView']);
Route::delete('/api/blog/{blog}', [BlogController::class, 'delete']);

Route::get('/api/subscribers', [SubscribeController::class, 'index']);
Route::post("/api/subscribe", [SubscribeController::class, 'store']);

Route::get('/api/reviews', [ReviewController::class, 'index']);
Route::post("/api/review", [ReviewController::class, 'store']);
Route::post('/api/review/published/{id}', [ReviewController::class, 'publish']);
Route::post('/api/review/marked/{id}', [ReviewController::class, 'mark']);

Route::get('/api/contact', [ContactController::class, 'index']);
Route::post("/api/contact", [ContactController::class, 'store']);
Route::get('/api/contact/{id}', [ContactController::class, 'show']);
Route::post('/api/contact/marked/{id}', [ContactController::class, 'mark']);
Route::delete('/api/contact/{contact}', [ContactController::class, 'delete']);
    Route::post('/api/contacts/reply/{id}', [ContactController::class, 'replyToContact']);

require __DIR__.'/auth.php';
