<?php

use App\Models\Answer;
use App\Models\Assertion;
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
        Schema::create('assertions_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Assertion::class)->constrained()
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(Answer::class)->constrained()
            ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('choice_answers');
    }
};
