<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'question_number' => $this->resource->question_number,
            'question_body' => $this->resource->question_body,
            'question_type' => $this->resource->question_type,

            'propositions' => PropositionResource::collection($this->resource->propositions),
            //'survey' => new SurveyResource($this->resource->survey),
        ];
    }
}
