<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\SurveySeeder;
use Database\Seeders\AnswersBigScreenSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            SurveySeeder::class,
            QuestionSeeder::class,
            UserSeeder::class,
            AnswersBigScreenSeeder::class
        ]);
    }
}
