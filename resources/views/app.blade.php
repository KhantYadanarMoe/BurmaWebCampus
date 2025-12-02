<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Default Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap" rel="stylesheet">

        <!-- Admin Selected Font -->
        @php
            $setting = \App\Models\AppearanceSetting::first();
        @endphp

        @if($setting && $setting->google_font_url)
            <link href="{{ $setting->google_font_url }}" rel="stylesheet">
        @endif

        <!-- Global font-family CSS -->
        <style>
            body {
                font-family: 
                    {{ $setting && $setting->google_font_family 
                        ? "'{$setting->google_font_family}', Figtree, 'Playfair Display', serif" 
                        : "'Figtree', 'Playfair Display', serif" }};
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased">
        <div id="app"></div>
    </body>
</html>
