<?php

namespace App\Http\Controllers;

use App\Http\Requests\SurveyRequest;
use App\Traits\HttpResponses;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SurveyController extends Controller
{

    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try{
            $params = array(0,10,'ASC');
            $surveys = DB::select('call get_surveys(?,?,?)',  $params);
           return $this->success($surveys,'Surveys list', 200);

        } catch (Exception $e) {
            return $this->error($e, 'Failed to get surveys',400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

  
    /**
     * Store a newly created resource in storage.
     */
    public function store(SurveyRequest $request)
    {
        try {
            
            // Validate the request
            $request->validated($request->all());

            // Store Procedure Parameters
            $parameters = array(
                 $request->title_en,
                 $request->title_ar,
                 $request->description,
                 $request->nb_max_attempt,
                 $request->date_start,
                 $request->date_end,
                 $request->user_id,
                 $request->project_id
            );

         try{
               // call proceure to store data.
               DB::select('call insert_survey(?,?,?,?,?,?,?,?)',$parameters);

               // get the new instance of survey
               $survey =  DB::select('call get_last_created_survey()');

               if (isset($survey)) {

                $services = $request->services;

                // save survey service
                foreach($services as $service) {

                    try{
                        $params = array( 
                            $survey[0]->id,
                            $service['id']
                        ); 
                        DB::select('call insert_survey_service(?,?)',$params);
                    } catch(Exception $e) {
                        return  $this->error($service, 'Failed to link service on survey',400);
                    }
                }

                return  $this->success($survey, 'Survey has been succesfully created',200);
                
               } else {
                  return  $this->error($request, 'We cannot save services on this survey.',400);
               }

            } catch(Exception $e) {
               
                return  $this->error($e, 'Failed to save survey.',400);
            }
        
        } catch(Exception $e) {
           return  $this->error(null, 'Please check the parameters and try again.',400);
          
        }
         
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $resulat = [];
        //
        try{

            // Get survey information
            $survey = DB::select('call get_survey(?)',  array($id));

            try {
                // get list of service
                $services = DB::select('call get_survey_services(?)', array($id));

                try {
                    //code...
                    $assertions =  DB::select('call get_assertions()');

                    if (isset($services) && isset($assertions)) {
                        // get services assertions

                        $assertionsList = [];
                        
                        foreach($services as $service) {

                            // will get all services data
                            $choicesList = [];

                            // get all assertions of a service
                            $assertionServices = array_filter($assertions,
                            function($data) use($service) {
                                return $data->service_id === $service->id;    
                            });

                            if(isset($assertionServices)) {
                                // Get choices of each assertions
                                    
                                    foreach($assertionServices as $assertion) {
        
                                        try {

                                            $choices =  DB::select('call get_assertion_choices(?)',array($assertion->id));

                                            // Format choices answers
                                            $assertionChoices =  array_map(function($data){
                                                   return array(
                                                   "id" => $data->id,
                                                   "answer_en" => $data->answer_en,
                                                   "answer_ar" => $data->answer_ar,
                                                   "type" => $data->type,
                                                   "reponse" => $data->type ==="radio" ? false: ""
                                                );
                                            }, $choices);
    
                                        array_push($choicesList, 
                                            array(
                                                "id" => $assertion->id,
                                                "service_id" => $assertion->service_id,
                                                "content_en" => $assertion->content_en,
                                                "content_ar" => $assertion->content_ar,
                                                "answers" => array($assertion->type => $assertionChoices),
                                                "reponse" => $assertion->type ==="radio" ?  ""  : []
                                            )
                                        );

                                        } catch (Exception $e) {
                                           return $this->success($e, 'Failed to get assertions choices',200);
                                        }
                                           
                                    }

                                  // set assertions arrays
                                 array_push($assertionsList,array(
                                    "id" => $service->id,
                                    "service_en" => $service->service_en,
                                    "service_ar" => $service->service_ar,
                                    "type" => $service->type,
                                    "assertions" => $choicesList
                                ));

                            }

                        }

                        $resulat  = array(
                            'survey' =>  $survey[0],
                            'services' =>$assertionsList
                        );
                        return  $this->success($resulat, 'Survey data',200);
                    } else {
                        $resulat  = array(
                            'survey' =>  $survey[0],
                            'services' =>[]
                        );
                        return $this->success($resulat, 'Empty survey servi',200);
                      
                    }
                    
                } catch (Exception $e) {
                    return $this->error($e, 'Failed to get assertions',400);
                }

            
            } catch (Exception $e) {
                return $this->error($e, 'Failed to get survey services',400);
            }

            // Build survey data
            $resulat  = array(
                'survey' =>  $survey[0],
                'services' =>$services
            );

            return $this->success($resulat, 'List of surveys data',200);

        } catch (Exception $e) {
                $this->error($e, 'Failed to get survey',400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}
