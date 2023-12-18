<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    use HasFactory;

    /* protected $primaryKey = [
        'survey_id',
        'email'
    ]; */

    /**
     * fillable
     * Les attributs de Participant renseignables
     * @var array
     */
    protected $fillable = [
        'email',
        'token',
        'survey_id'
    ];

    /**
     * survey
     * récupère le sondage de ce participant
     * @return BelongsTo
     */
    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Creation du participant + enregistrement de ses reponses
     */
    public static function save_answers($email, $survey_id, $answers)
    {
        try {

            if(!isset($email)) {
                throw new \Exception("email non renseigné");
            }
            if(!isset($survey_id)) {
                throw new \Exception("survey_id non renseigné");
            }
            if(!isset($answers)) {
                throw new \Exception("answers non renseigné");
            }

            $answerParticipant = [];
            $participant = null;

            //creation de l'entité participant
            $participant = Participant::create(
                [
                   "email" => $email,
                   "token" => base64_encode($email) . base64_encode($survey_id),
                   "survey_id" => $survey_id
                   ]
            );



            //Sauvegardes des reponses
            foreach($answers as $answer) {
                $answer = Answer::create([
                    "value" => $answer["value"],
                    "email" => $email,
                    "survey_id" => $survey_id,
                    "question_id" => $answer["question_id"],
                ]);

                $cleanAnswer = [
                    "id" => $answer->id,
                    "value" => $answer->value,
                    "email" => $answer->email,
                    "survey_id" => $answer->question->survey->id,
                    "survey" => $answer->question->survey->title,
                    "question_id" => $answer->question->id,
                    "question_body" => $answer->question->question_body,
            ];
                array_push($answerParticipant, $cleanAnswer);

            };



            return  (object)["participant" => [
                "email" => $participant->email,
                "token" => $participant->token,
                "survey_id" => $participant->survey->id,
                "survey" => $participant->survey->title,
            ],"answers" => $answerParticipant];

        } catch (\Throwable $th) {
            throw $th;
        }


    }


    public function clean_answers_object(Answer $object)
    {
        return  [
            "id" => $object->id,
            "value" => $object->id,
            "email" => $object->id,
            "survey" => $object->survey->title,
            "question_id" => $object->qustion->question_body,
    ];
    }

    public static function findByToken($token){
        $participant = Participant::where('token', $token)->get()->first();
        return $participant;
    }

}
