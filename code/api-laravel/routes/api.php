<?php

use App\Http\Controllers\AnswerContoller;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('/login', [AuthController::class,"login"]);
Route::post('/register', [AuthController::class,"register"]);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class,"me"]);
Route::middleware('auth:sanctum')->post('/revokeToken', [AuthController::class,"revokeToken"]);

Route::prefix('surveys')->middleware("auth:sanctum")->group(function () { // à rapatrier dans admin
    Route::get('/', [SurveyController::class, 'index']);
});
Route::prefix('questions')->middleware("auth:sanctum")->group(function () { // à rapatrier dans admin
    Route::get('/{surveyId}', [QuestionController::class, 'index']);
});
Route::prefix('client')->group(function () {
    Route::get('/questions/{surveyId}', [QuestionController::class, 'index']); // A
    Route::get('/questions/survey/{surveyToken}', [QuestionController::class, 'findByTokenSurvey']); // AA
    Route::get('/surveys/{surveyToken}', [SurveyController::class, 'show']);
    Route::get('/surveys/survey/{token}', [SurveyController::class, 'findByTokenParticipant']);
    Route::post('/answers', [AnswerContoller::class, 'storeForParticipant']);
    Route::get('/answers/{token}', [AnswerContoller::class, 'getParticipantAnswersClient']);
});
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/answers/{token}', [AnswerContoller::class, 'getParticipantAnswersAdmin']);
    Route::get('/participants', [ParticipantController::class, 'getAdminParticipant']);
});
Route::prefix('answers')->group(function () {
    Route::middleware('auth:sanctum')->get('/', [AnswerContoller::class, 'index']);
    Route::middleware('auth:sanctum')->get('/count/value/{survey_id}', [AnswerContoller::class, 'getCountValue']);
    //Route::post('/', [AnswerContoller::class, 'store']);
    Route::post('/', [AnswerContoller::class, 'storeForParticipant']); // à surement enlever
    //Route::middleware('auth:sanctum')->get('/{answerId}', [AnswerContoller::class, 'index']);
});
Route::prefix('participants')->group(function () {
    Route::middleware('auth:sanctum')->get('/', [ParticipantController::class, 'index']);
    Route::middleware('auth:sanctum')->post('/', [ParticipantController::class, 'store']);
});
