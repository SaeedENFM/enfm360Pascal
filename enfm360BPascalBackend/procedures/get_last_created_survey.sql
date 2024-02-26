CREATE DEFINER=`root`@`localhost` PROCEDURE `get_last_created_survey`()
BEGIN
		SELECT * FROM `surveys` 
        ORDER BY surveys.updated_at ASC
        LIMIT 1;
END