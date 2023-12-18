<?php

namespace Database\Seeders;

use App\Models\Survey;
use Faker\Generator;
use Illuminate\Database\Seeder;

class SurveySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Survey::create([
            'title' => "Sondage Bigscreen",
                'description' => "Participez à notre sondage client et partagez vos impressions. Vous avez le pouvoir d'influencer le développement de nos futurs contenus VR.",
                
                'token' => 'bigscreen'
        ]);
    }
}
