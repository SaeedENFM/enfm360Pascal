CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_type`(IN TYPE varchar(255))
BEGIN
	
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO types(type,created_at,updated_at)
	VALUES(TYPE,@CREATED_AT,@UPDATED_AT);
END