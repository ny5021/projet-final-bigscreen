<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Participant;
use Illuminate\Http\Request;
use App\Http\Requests\AnswerRequest;
use App\Http\Resources\AnswerRessource;
use App\Http\Requests\StoreAnswerForParticipantRequest;
use App\Http\Resources\AnswerFullResource;

class AnswerContoller extends Controller
{
    /**
     * Display a listing of surveys.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AnswerRessource::collection(Answer::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AnswerRequest $request)
    {
        try {
            $request->validated();
            $answer = Answer::create([
                "value" => $request->value,
                "email" => $request->email,
                "survey_id" => $request->survey_id,
                "question_id" => $request->question_id,
            ]);


            return  $answer ;

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }


    /**
     * Enregistrements des réponses envoyé par l'utilisateur
     */
    public function storeForParticipant(StoreAnswerForParticipantRequest $request)
    {
        try {

            $request->validated();

            $survey_id =   $request->survey_id;
            $email = $request->email;
            $answers = $request->answers;

            // check de l'existence de ce participant
            $participant = Participant::where('survey_id', $survey_id)
                                        ->where('email', $email)->get();
            if(count($participant) > 0) {
                return response()->json([
                    "message" => "Vous avez déjà participé à ce sondage"
                ], 500);
            };

            $answersSaved = Participant::save_answers($email, $survey_id, $answers);
            return response()->json([
                'message' => "Sondage enrgistré",
                "data" => $answersSaved

            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }


    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Obtenir le nombres de repetion de la reponse
     *  @param string $survey_id
     * @param string $question_number
     *
     */
    public function getCountValue($survey_id, Request $request)
    {
        try {

            if(!isset($request->question_number)) {
                throw new \Exception("Le param question_number doit etre renseigné");
            }

            $survey_id = 1;
            $question_number =  $request->question_number;
            $question_number = $request->question_number;
            $result = Answer::getCountOfValue($survey_id, $question_number);

            if(!isset($result) || empty($result) || count($result) == 0) {
                throw new \Exception("Données inexistante pour ce numéro de question");
            }

            return $result;

        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getParticipantAnswersClient($token)
    {
        $participant = Participant::findByToken($token);
        if(!$participant) {
            return response()->json([
                'message' => "Nous n'avons pas pu récupérer vos réponses"
            ], 500);
        }
        $answers = Answer::where('email', $participant->email)
                            ->where('survey_id', $participant->survey_id)
                            ->get();
        return AnswerFullResource::collection($answers);
    }

    public function getParticipantAnswersAdmin($token)
    {
        $participant = Participant::findByToken($token);
        $answers = Answer::where('email', $participant->email)
                            ->where('survey_id', $participant->survey_id)
                            ->get();
        return AnswerRessource::collection($answers);
    }
}
