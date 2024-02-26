CREATE DEFINER=`root`@`localhost` PROCEDURE `get_survey_services`(IN SURVEYID int)
BEGIN
	
    SELECT t5.id, t5.service_en, t5.service_ar, t1.type 
	FROM types AS t1 
    INNER JOIN choices  AS t2
    ON  t1.id = t2.type_id 
    INNER JOIN assertion_choices AS t3
    ON  t3.choice_id = t2.id 
	INNER JOIN assertions AS t4
	ON  t4.id = t3.assertion_id
    INNER JOIN services AS t5
    ON  t5.id = t4.service_id
    INNER JOIN survey_services  AS  t6
    ON  t5.id = t6.service_id AND t6.survey_id = SURVEYID
    GROUP BY t5.id
    ORDER BY t5.id;
    
END