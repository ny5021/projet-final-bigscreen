<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Answer extends Model
{
    use HasFactory;

    /**
     * fillable
     * Les attributs de Answer renseignables
     * @var array
     */
    protected $fillable = [
        'value',
        'question_id',
        'survey_id',
        'email'
    ];

    /**
     * question
     * retourne la question liée à cette réponse
     * @return BelongsTo
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * participant
     * retourne le participant qui a donné cette réponse
     * @return BelongsTo
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Retourne le nombre de repetions des reponse a partir des numero de questions
     *
     * @param string $question_number numéro de la question
     *
     *
     */
    public static function getCountOfValue($survey_id, $question_number)
    {

        $query =  DB::table("answers")->selectRaw("answers.value, COUNT(answers.value) as count")
           ->leftjoin("questions", "questions.id", "=", "answers.question_id")
           ->leftjoin("surveys", "surveys.id", "=", "answers.survey_id")
           ->WhereRaw("questions.question_number = ?", $question_number)
           ->WhereRaw("answers.survey_id = ?", $survey_id)
           ->groupBy("answers.value")
        ;

        return $query->get();
    }

}
