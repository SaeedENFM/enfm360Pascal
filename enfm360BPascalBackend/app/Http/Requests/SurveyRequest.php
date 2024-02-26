<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SurveyRequest extends FormRequest
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
            'title_en' => ['required', 'max:255'],
            'title_ar'  => ['required', 'max:255'],
            'description'  => ['required', 'max:3000'],
            'nb_max_attempt' => ['required'],
            'date_start' => ['required'],
            'date_end' => ['required'],
            'user_id' => ['required'],
            'project_id' => ['required'],
            'services' => ['required']
        ];
    }
}
