<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\Participant;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Database\Seeder;

class AnswersBigScreenSeeder extends Seeder
{
    private $faker;

    public function __construct()
    {
        $this->faker = Factory::create("fr_FR");
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0;$i < 35; $i++) {
            $this->generate_participant();
        }
    }

    /**
     * Generation d'un participant avec ses reponses
     */
    private function generate_participant()
    {
        $email = $this->faker->email();
        $survey_id = Survey::findByTitle("Sondage Bigscreen")->id;
        $answers = $this->generate_answers($email);
        $answersSaved = Participant::save_answers($email, $survey_id, $answers);
        return   $answersSaved;
    }

    /**
     * Génére un tableau d'objet contenant l'id de la question et sa reponse
     */
    private function generate_answers($email)
    {
        $bigScreenQuestions = $this->bigScreenQuestion();

        $cb = function ($questionItem) use ($email) {
            $type = $questionItem["type"];
            $propositions = $questionItem["propositions"];
            if($questionItem["body"] == "Votre adresse email") {
                $value = $email;
            } else {
                $value = $this->generate_answer_by_type($type, $propositions);
            }

            return ["question_id" => $questionItem["question_id"], "value" => $value ];
        };
        return  array_map($cb, $bigScreenQuestions);
    }


    /**
     * génération d'un tableau contenant les question de bigscreen
     */
    private function bigScreenQuestion()
    {
        // chemin d'accès à votre fichier JSON
        $file = public_path("questions.json");
        // décoder le flux JSON
        $questions = json_decode(file_get_contents($file), true);

        $cb =  function ($v) {
            $body =  $v["body"];
            $question = Question::findbyQuestionBody($body);
            $propositions = null;
            if(isset($v["propositions"])) {
                $propositions = $v["propositions"];
            }

            return ["question_id" =>  $question->id, "body" => $body, "type" => $v["type"], "propositions" => $propositions];
        };

        return  array_map($cb, $questions);

    }

    /**
     * Générateur de reponse aleatoire en fonction du type de question
     * si type A selectionne un element aleatoire dans les propositions
     * si type B une phrase avec 5 mots aleatoir
    */
    private function generate_answer_by_type($type, $propositions)
    {

        switch ($type) {
            case 'A':
                return $this->faker->randomElement($propositions);
            case 'B':
                return $this->faker->realText();
            case 'C':
                return $this->faker->numberBetween(1, 5);
        }

    }

}
