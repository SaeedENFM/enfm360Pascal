CREATE DEFINER=`root`@`localhost` PROCEDURE `get_choices`()
BEGIN
	SELECT id, answer_en, answer_ar,type_id FROM `choices` 
    ORDER BY choices.id ASC;
END