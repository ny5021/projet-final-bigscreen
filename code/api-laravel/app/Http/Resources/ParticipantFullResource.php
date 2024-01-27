<?php

namespace App\Http\Resources;

use App\Models\Answer;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantFullResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $answers =    $answers = Answer::where('email', $this->resource->email)
        ->where('survey_id', $this->resource->survey->id)
        ->get()->first();

        return [
            "email" => $this->resource->email,
            "token" => $this->resource->token,
            "created_at" => $this->resource->created_at,
            "survey" => new SurveyResource($this->resource->survey),
            "answers" => new AnswerRessource($answers)
        ];
    }
}
