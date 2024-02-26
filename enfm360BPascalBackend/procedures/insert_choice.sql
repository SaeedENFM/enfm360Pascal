CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_choice`(IN ANSWER_EN longtext, ANSWER_AR longtext, TYPE_ID INT)
BEGIN

    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO choices(answer_en,answer_ar,type_id,created_at,updated_at)
	VALUES(ANSWER_EN, ANSWER_AR, TYPE_ID, @CREATED_AT, @UPDATED_AT);
END