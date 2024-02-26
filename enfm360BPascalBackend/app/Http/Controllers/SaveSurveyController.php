<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponses;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaveSurveyController extends Controller
{
    //
    use HttpResponses;
          
    /**
     * Save survey reponse the specified resource from storage.
     */
    public function  savesurvey(Request $request)
    {
        //
        try{

            $resultat = [];
            $surveysData =  $request->answers;

            // Check if user has already answer
            $data = array(
                $surveysData[0]['participant_id'],
                $surveysData[0]['survey_id']
            );

           $resultat =   DB::select('call check_if_participant_has_answer(?,?)',$data);
           if (isset( $resultat) && count($resultat) > 0) {
            return  $this->error($resultat, 'Participant has already response to survey.',400);
           }
           
            foreach($surveysData as $survey) {

            // Store Procedure Parameters
            $parameters = array(
                $survey['survey_id'],
                $survey['participant_id'],
                $survey['service_id'],
                $survey['assertion_id'],
                $survey['type'],
                $survey['reponse'],
                $survey['comment']
           );

              // call proceure to store data.
              DB::select('call insert_answer(?,?,?,?,?,?,?)',$parameters);

              // get the new instance of survey
              $answer =  DB::select('call get_lastest_answer()');

              if (isset($answer)) {

                array_push($resultat,array(
                    "survey_id" =>  $answer[0]->survey_id,
                    'participant_id' => $answer[0]->participant_id,
                    'service_id' => $answer[0]->service_id,
                    'assertion_id' => $answer[0]->assertion_id,
                    'type' => $answer[0]->type,
                    'reponse' => $answer[0]->reponse,
                    'comment' => $answer[0]->comment
                ));

                try{
                    $params = array( 
                        $survey['assertion_id'],
                        $answer[0]->id
                    ); 
                    DB::select('call insert_assertion_answers(?,?)',$params);
                } catch(Exception $e) {
                    return  $this->error($answer, 'Failed to link assertion answer.',400);
                };
               
              } 
            }

           } catch(Exception $e) {
               return  $this->error($e->getMessage(), 'Failed to save survey.',400);
           }
       
        if(isset($resultat)) {
            return  $this->success($resultat, 'Survey has been successfully created.',200);
        } else {
            return  $this->success(null, 'Survey cannot be created.',400);
        }
            
    }


    /**
     * Display a listing of the resource.
     */
    public function statsByAssertions(string $id)
    {
        //
        try {

          $resultat = DB::select('call get_resultat_by_assertions(?)',array($id));

          return  $this->success($resultat,'All assertions result data',200);

        }catch (Exception $e) {
            return $this->error($e, 'Failed to get assertions result', 400);
        }
    }


    /**
     * Display a listing of the resource.
     */
    public function statsByChoices(string $id)
    {
        //
        try {

          $resultat = DB::select('call get_resultat_by_choices(?)',array($id));

          return  $this->success($resultat,'All assertions result data',200);

        }catch (Exception $e) {
            return $this->error($e, 'Failed to get assertions result', 400);
        }
    }

}
