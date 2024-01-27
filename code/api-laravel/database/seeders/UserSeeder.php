<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Factory::create();


        $userAccount = [

            [
                "name" => $faker->firstName(),
                "email" => "admin@admin.com",
                "password" => "password"
            ]

        ];


        foreach ($userAccount as $item) {

            User::create([
                "name" => $item['name'],
                "email" => $item['email'] ,
                "password" => Hash::make($item["password"])
            ]);

        }


    }
}
