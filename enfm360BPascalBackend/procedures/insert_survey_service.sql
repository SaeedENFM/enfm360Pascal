CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_survey_service`(IN SURVEY_ID int, IN SERVICE_ID int)
BEGIN
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO survey_services(survey_id,service_id,created_at,updated_at)
	VALUES(SURVEY_ID,SERVICE_ID,@CREATED_AT,@UPDATED_AT);
END