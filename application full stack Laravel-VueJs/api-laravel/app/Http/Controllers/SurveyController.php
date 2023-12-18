<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use App\Models\Participant;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    /**
     * Display a listing of surveys.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SurveyResource::collection(Survey::paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($surveyToken)
    {
        return new SurveyResource(Survey::where('token', $surveyToken)->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

    public function findByTokenParticipant($token){
        $participant = Participant::findByToken($token);
        if(!$participant){
            return response()->json([
                'message' => "Nous n'avons pas pu récupérer votre sondage"
            ], 500);
        }
        return new SurveyResource($participant->survey);
    }
}
