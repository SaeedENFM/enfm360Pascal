<?php

namespace App\Traits;

/**
 * 
 */
trait HttpResponses
{
    /**
     *  return the success of http resquest
     */
    protected function success($data, $message = null, $code = 200) {

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }


    /**
     *  return the http resquest error
     */
    protected function error($data, $message = null, $code) {

        return response()->json([
            'status' => 'failed',
            'message' => $message,
            'data' => $data
        ], $code);
    }
    
}
