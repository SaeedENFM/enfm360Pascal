<?php

use App\Models\Assertion;
use App\Models\Choice;
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
        Schema::create('assertion_choices', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Assertion::class)->constrained()
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(Choice::class)->constrained()
            ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assertion_choices');
    }
};
