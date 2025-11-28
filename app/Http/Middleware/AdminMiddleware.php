<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Only admins (is_admin = 1)
        if (Auth::user()->is_admin != 1) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
