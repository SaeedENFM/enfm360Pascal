CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_answer`(IN SURVEYID int, IN PARTICIPANTID int, IN SERVICEID int,IN ASSERTIONID int,IN TYPE varchar(255),IN RESPONSE varchar(255), IN COMMENT longtext)
BEGIN

    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO answers(survey_id, participant_id, service_id, assertion_id,type,reponse,comment,created_at,updated_at)
	VALUES(SURVEYID,PARTICIPANTID,SERVICEID,ASSERTIONID,TYPE,RESPONSE ,COMMENT,@CREATED_AT,@UPDATED_AT);
END