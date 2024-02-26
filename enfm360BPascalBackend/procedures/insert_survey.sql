CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_survey`(IN TITLE_EN varchar(255), IN TITLE_AR varchar(255), IN DESCRIPTION longtext,
IN NB_MAX_ATTEMPT int, IN  DATE_START date, IN  DATE_END date, IN USER_ID int, PROJECT_ID int)
BEGIN

    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO surveys(title_en,title_ar,description,nb_max_attempt,date_start,date_end,user_id,project_id,created_at,updated_at)
	VALUES(TITLE_EN,TITLE_AR,DESCRIPTION,NB_MAX_ATTEMPT, DATE_START,DATE_END,USER_ID,PROJECT_ID,@CREATED_AT,@UPDATED_AT);
END