<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('provider_id'); 
            $table->string('title');
            $table->decimal('price', 10, 2);
            $table->string('image');
            $table->timestamps();

            $table->foreign('provider_id')->references('id')->on('business_profiles')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipments');
    }
};
