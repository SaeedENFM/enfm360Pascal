<?php

use App\Models\Service;
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
        Schema::create('assertions', function (Blueprint $table) {
            $table->id();
            $table->longText('content_en')->nullable(false);
            $table->longText('content_ar')->nullable(false);
            Schema::table('assertions', function (Blueprint $table) {
                $table->foreignIdFor(Service::class)->constrained()
                ->onDelete('cascade')->onUpdate('cascade');
                });
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assertions');
    }
};
