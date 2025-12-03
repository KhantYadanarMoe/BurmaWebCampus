<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

class SessionTimeout
{
    public function handle($request, Closure $next)
    {
        // Fetch session_timeout from your security table
        $security = DB::table('security_settings')->first(); // adjust table name

        if ($security && $security->session_timeout) {
            // Convert seconds to minutes because Laravel expects minutes
            $minutes = ceil($security->session_timeout / 60);
            Config::set('session.lifetime', $minutes);
        }

        return $next($request);
    }
}
