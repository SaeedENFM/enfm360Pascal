CREATE DEFINER=`root`@`localhost` PROCEDURE `get_survey`(IN SURVEYID int)
BEGIN
	SELECT * FROM surveys AS s
    WHERE s.id = SURVEYID;
END