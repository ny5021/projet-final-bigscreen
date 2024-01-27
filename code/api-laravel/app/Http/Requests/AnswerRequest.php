<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AnswerRequest extends FormRequest
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
            'email' => 'required|email',
            'value' => 'required',
            'survey_id' => 'required',
            'question_id' => 'required'
        ];


    }



    /**

     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'Adresse email requis',
            'email.email' => 'Email non valide',
            'value.required' => 'ce champs est requis',
            'survey_id.required' => 'ce champs est requis',
            'question_id.required' => 'ce champs est requis',
        ];

    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        $response = response()->json([
            'message' => 'Données non conforme',
            'details' => $errors->messages(),
        ], 422);
        throw new HttpResponseException($response);
    }



}
