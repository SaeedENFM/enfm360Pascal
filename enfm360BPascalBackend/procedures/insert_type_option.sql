CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_type_option`(IN TYPE_ID int, IN OPTION_ID int)
BEGIN
	
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO type_options(option_id,type_id,created_at,updated_at)
	VALUES(OPTION_ID,TYPE_ID,@CREATED_AT,@UPDATED_AT);
END