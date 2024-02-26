CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_assertion_choices`(IN ASSERTION_ID int,IN CHOICE_ID int)
BEGIN
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO assertion_choices(assertion_id,choice_id,created_at,updated_at)
	VALUES(ASSERTION_ID,CHOICE_ID,@CREATED_AT,@UPDATED_AT);
END