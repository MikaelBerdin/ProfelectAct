<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('fast_food_chains', function (Blueprint $table) {
        $table->id();
        $table->string('branch_name');
        $table->string('founder');
        $table->string('location');
        $table->date('date_founded');
        $table->unsignedBigInteger('created_by');
        $table->timestamps(); // This adds created_at and updated_at
    });      
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fast_food_chains');
    }
};
