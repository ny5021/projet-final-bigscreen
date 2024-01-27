<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationsQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->foreignId("survey_id")->change()->foreign("survey_id")->references('id')->on("surveys");
            $table->boolean('required');
            $table->boolean('is_email')->nullable();
            $table->integer('min_val')->nullable();
            $table->integer('max_val')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            //
        });
    }
}
