<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationsParticipantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->foreignId("survey_id")->change()->foreign("survey_id")->references("id")->on("surveys");
            $table->dropColumn("id");
            $table->primary(["survey_id","email"], "pk_participant");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('participant', function (Blueprint $table) {
            //
        });
    }
}
