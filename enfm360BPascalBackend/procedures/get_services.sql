CREATE DEFINER=`root`@`localhost` PROCEDURE `get_services`()
BEGIN
	SELECT id,service_en, service_ar FROM `services`
    ORDER BY services.id ASC;
END