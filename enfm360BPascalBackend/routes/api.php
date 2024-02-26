<?php

use App\Http\Controllers\SaveSurveyController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('survey', SurveyController::class);
Route::resource('service', ServiceController::class);
Route::post('/savesurvey',[SaveSurveyController::class, 'savesurvey']);
Route::get('/resultByAssertions/{surveyId}',[SaveSurveyController::class, 'statsByAssertions']);
Route::get('/resultByChoices/{surveyId}',[SaveSurveyController::class, 'statsByChoices']);