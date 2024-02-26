CREATE DEFINER=`root`@`localhost` PROCEDURE `get_assertions`()
BEGIN
	SELECT  t4.id, t4.content_en, t4.content_ar, t4.service_id, t1.type  
    FROM types t1
    INNER JOIN choices t2
    INNER JOIN assertion_choices t3 
    INNER JOIN assertions t4
	ON t4.id = t3.assertion_id AND t3.choice_id = t2.id AND t2.type_id = t1.id
	GROUP BY t4.id
    ORDER BY t4.id;
END