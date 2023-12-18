<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantRessource extends JsonResource
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
            "email" => $this->resource->email,
            "token" => $this->resource->token,
            "created_at" => $this->resource->created_at,
            "survey" => new SurveyResource($this->resource->survey)
        ];
    }
}
