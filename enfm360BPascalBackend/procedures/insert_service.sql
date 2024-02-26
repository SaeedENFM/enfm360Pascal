CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_service`(IN SERVICE_EN longtext, IN SERVICE_AR longtext)
BEGIN
	
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO services(service_en,service_ar,created_at,updated_at)
	VALUES(SERVICE_EN,SERVICE_AR,@CREATED_AT,@UPDATED_AT);
END