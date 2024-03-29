<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class saveSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Validation
            
            'survey_id' => ['required'],
            'participant_id'  => ['required'],
            'service_id'  => ['required'],
            'type' => ['required'],
            'reponse' => ['required','max:3000'],
            'comment' => ['required','max:500']
       ];
    }
}
