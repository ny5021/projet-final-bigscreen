<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
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
            'required' => $this->resource->required,
            'is_email' => $this->resource->is_email,
            'min_val' => $this->resource->min_val,
            'max_val' => $this->resource->max_val,

            'propositions' => PropositionResource::collection($this->resource->propositions),
            //'survey' => new SurveyResource($this->resource->survey),
        ];
    }
}
