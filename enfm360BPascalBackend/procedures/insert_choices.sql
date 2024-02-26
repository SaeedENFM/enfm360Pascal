CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_choices`(IN ANSWER_EN longtext, ANSWER_AR longtext, TYPE_ID INT)
BEGIN
	DECLARE ANSWER_EN longtext;
    DECLARE ANSWER_AR longtext;
	DECLARE TYPE_ID int;
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
	SET @ANSWER_EN = ANSWER_EN;
    SET @ANSWER_AR = ANSWER_AR;
    SET @TYPE_ID = TYPE_ID;
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO choices(answer_en,answer_ar,type_id,created_at,updated_at)
	VALUES(@ANSWER_EN, @ANSWER_AR, @TYPE_ID, @CREATED_AT, @UPDATED_AT);
END