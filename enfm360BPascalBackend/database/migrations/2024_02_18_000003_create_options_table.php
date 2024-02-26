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
        Schema::create('options', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('min')->min(1);
            $table->unsignedInteger('max');
            $table->boolean('required')->default(false);
            $table->unsignedInteger('width')->default(200)->max(500);
            $table->unsignedInteger('height')->default(200);
            $table->string('color')->default('');
            $table->unsignedInteger('nb_rows')->min(3);
            $table->unsignedInteger('nb_cols')->min(1);
            $table->string('mime');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('options');
    }
};
