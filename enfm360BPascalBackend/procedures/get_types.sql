CREATE DEFINER=`root`@`localhost` PROCEDURE `get_types`()
BEGIN
	SELECT id,type FROM `types`;
END