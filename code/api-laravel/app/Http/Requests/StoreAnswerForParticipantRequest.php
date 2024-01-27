<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreAnswerForParticipantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
           "survey_id" => "required",
           "email" => "required",
           "answers" => "required|array",
           "answers.*.question_id" => "required",
           "answers.*.value" => "required"
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        $response = response()->json([
            'message' => "Veuillez remplir tous les champs obligatires", //"Erreur validation",
            'details' => $errors->messages(),
        ], 422);
        throw new HttpResponseException($response);
    }



}
