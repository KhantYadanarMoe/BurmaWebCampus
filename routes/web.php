<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseCategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseProgressController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\siteInfoSettingController;
use App\Http\Controllers\SubscribeController;
use App\Http\Middleware\IsAdmin;
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


Route::middleware(['web', 'guest'])->group(function () {
    Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);
    Route::get('auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
});


Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth:sanctum')->get('/api/user', [AuthController::class, 'details']);

Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/logout', [AuthController::class, 'logout']);

Route::get('/api/users', [AuthController::class, 'index']);
Route::get('/api/user/{name}/details', [AuthController::class, 'show']);

Route::get('/api/course/categories', [CourseCategoryController::class, 'index']);
Route::get('/api/course/category/{id}', [CourseCategoryController::class, 'show']);

Route::get('/api/courses', [CourseController::class, 'index']);
Route::get('/api/course/{slug}', [CourseController::class, 'show']);

Route::get('/api/comments', [CommentController::class, 'index']);
Route::get('api/subtitle/{subtitle}/comments', [CommentController::class, 'getBySubtitle']);

Route::get('/api/blog/categories', [BlogCategoryController::class, 'index']);
Route::get('/api/blog/category/{id}', [BlogCategoryController::class, 'show']);

Route::get('/api/blogs', [BlogController::class, 'index']);
Route::get('/api/blog/{id}', [BlogController::class, 'show']);
Route::post('/api/blog/{id}/view', [BlogController::class, 'incrementView']);

Route::post("/api/subscribe", [SubscribeController::class, 'store']);

Route::get('/api/reviews', [ReviewController::class, 'index']);
Route::post("/api/review", [ReviewController::class, 'store']);

Route::post("/api/contact", [ContactController::class, 'store']);

Route::middleware(['auth:sanctum', 'user'])->group(function () {
    Route::post('/api/user/default-payment', [AuthController::class, 'setDefaultPayment']);

    Route::get('/api/course/purchase', [PurchaseController::class, 'index']);
    Route::post('/api/course/purchase/create', [PurchaseController::class, 'store']);
    Route::get('/api/user/purchases', [PurchaseController::class, 'purchaseHistory']);

    Route::post('/api/subtitle/{id}/complete', [CourseProgressController::class, 'updateProgress']);
    Route::get('/api/course/{course}/progress', [CourseProgressController::class, 'getCourseProgress']);
    
    Route::post("/api/comment/create", [CommentController::class, 'store']);
  
    Route::get('/api/certificates', [CertificateController::class, 'userCertificates']);
    Route::post('/api/certificates', [CertificateController::class, 'store']);
});

Route::middleware(['auth:sanctum', IsAdmin::class])->group(function () {
    Route::put('/api/user/{user}', [AuthController::class, 'updateUser']);
    Route::put('/api/user/{user}/changePassword', [AuthController::class, 'changePassword']);
    Route::post('/api/users/banned/{id}', [AuthController::class, 'ban']);

    Route::post("/api/course/category/create", [CourseCategoryController::class, 'store']);
    Route::put('/api/course/category/{id}/visibility', [CourseCategoryController::class, 'updateVisibility']);
    Route::put('/api/course/category/{category}', [CourseCategoryController::class, 'update']);
    Route::delete('/api/course/category/{category}', [CourseCategoryController::class, 'delete']);
    
    Route::post('/api/courses/create', [CourseController::class, 'store']);
    Route::delete('/api/course/{course}', [CourseController::class, 'delete']);
  
    Route::post("/api/blog/category/create", [BlogCategoryController::class, 'store']);
    Route::put('/api/blog/category/{id}/visibility', [BlogCategoryController::class, 'updateVisibility']);
    Route::put('/api/blog/category/{category}', [BlogCategoryController::class, 'update']);
    Route::delete('/api/blog/category/{category}', [BlogCategoryController::class, 'delete']);

    Route::post("/api/blog/create", [BlogController::class, 'store']);
    Route::put('/api/blog/{blog}', [BlogController::class, 'update']);
    Route::delete('/api/blog/{blog}', [BlogController::class, 'delete']);

    Route::get('/api/subscribers', [SubscribeController::class, 'index']);
  
    Route::post('/api/review/published/{id}', [ReviewController::class, 'publish']);
    Route::post('/api/review/marked/{id}', [ReviewController::class, 'mark']);

    Route::get('/api/contact', [ContactController::class, 'index']);
    Route::get('/api/contact/{id}', [ContactController::class, 'show']);
    Route::post('/api/contact/marked/{id}', [ContactController::class, 'mark']);
    Route::delete('/api/contact/{contact}', [ContactController::class, 'delete']);
    Route::post('/api/contacts/reply/{id}', [ContactController::class, 'replyToContact']);

    Route::post('/api/quizzes/submit', [QuizController::class, 'store']);

    Route::get('/api/settings/info', [siteInfoSettingController::class, 'show']);
    Route::post('/api/settings/info', [siteInfoSettingController::class, 'update']);
});

require __DIR__.'/auth.php';
