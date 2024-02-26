<?php

use App\Models\Service;
use App\Models\Survey;
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
        Schema::create('survey_services', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Survey::class)->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(Service::class)->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_services');
    }
};
