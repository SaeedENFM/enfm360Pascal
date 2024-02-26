CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_assertion`(IN CONTENT_EN longtext, IN CONTENT_AR longtext)
BEGIN

    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO assertions(content_en,content_ar,created_at,updated_at)
	VALUES(CONTENT_EN,CONTENT_AR,@CREATED_AT,@UPDATED_AT);
END