CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_option`(IN NAME varchar(255))
BEGIN
    DECLARE MIN INT;
    DECLARE MAX INT;
	DECLARE REQUIRED boolean;
    DECLARE WIDTH INT;
    DECLARE HEIGHT INT;
    DECLARE COLOR varchar(255);
	DECLARE NB_ROWS INT;
    DECLARE NB_COLS INT;
    DECLARE MINE varchar(255);
    DECLARE CREATED_AT datetime;
    DECLARE UPDATED_AT datetime;
    
    SET @MIN = 0;
    SET @MAX = 0;
	SET @REQUIRED = true;
    SET @WIDTH = 0;
    SET @HEIGHT = 0;
    SET @COLOR = '';
	SET @NB_ROWS = 0;
    SET @NB_COLS = 0;
    SET @MIME = '';
    SET @CREATED_AT = now();
    SET @UPDATED_AT = now();
    
	INSERT INTO options(name,min,max,required,width,height,color,nb_rows,nb_cols,mime,created_at,updated_at)
	VALUES(NAME,@MIN,@MAX,@REQUIRED,@WIDTH,@HEIGHT,@COLOR,@NB_ROWS,@NB_COLS,@MIME,@CREATED_AT,@UPDATED_AT);
END