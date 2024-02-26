CREATE DEFINER=`root`@`localhost` PROCEDURE `get_lastest_answer`()
BEGIN
		SELECT * FROM `answers` 
        ORDER BY answers.updated_at ASC
        LIMIT 1;
END