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
    Schema::table('fast_food_chains', function (Blueprint $table) {
        if (!Schema::hasColumn('fast_food_chains', 'created_by')) {
            $table->unsignedBigInteger('created_by')->nullable();
        }
        if (!Schema::hasColumns('fast_food_chains', ['created_at', 'updated_at'])) {
            $table->timestamps();
        }
    });
}


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('fast_food_chains', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');
            $table->dropTimestamps();
        });
    }
};
