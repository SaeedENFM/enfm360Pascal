CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_choice_answers`(IN CHOICE_ID int, IN ANSWER_ID int)
BEGIN
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO choice_answers(choice_id,answer_id,created_at,updated_at)
	VALUES(CHOICE_ID,ANSWER_ID,@CREATED_AT,@UPDATED_AT);
END