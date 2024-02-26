<?php

use App\Models\Option;
use App\Models\Type;
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
        Schema::create('type_options', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Option::class)->constrained()
            ->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(Type::class)->constrained()
            ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_options');
    }
};
