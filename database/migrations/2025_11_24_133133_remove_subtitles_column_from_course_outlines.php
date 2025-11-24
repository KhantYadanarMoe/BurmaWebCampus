<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('course_outlines', function (Blueprint $table) {
            if (Schema::hasColumn('course_outlines', 'subtitles')) {
            $table->dropColumn('subtitles');
        }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_outlines', function (Blueprint $table) {
            $table->json('subtitles')->nullable();

        });
    }
};
