<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnswerRessource extends JsonResource
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
            'id' => $this->resource->id,
            'value' => $this->resource->value,
            "question_body" => $this->resource->question->question_body,
            "question_number" => $this->resource->question->question_number,
            "question_type" => $this->resource->question->question_type,
            "survey" => $this->resource->question->survey->title,
            'email' => $this->resource->email
        ];
    }
}
