CREATE DEFINER=`root`@`localhost` PROCEDURE `get_assertion_choices`(IN ASSERTIONID int)
BEGIN
		
		SELECT t1.id, t2.choice_id as choice, t1.answer_en, t1.answer_ar,t1.type_id,t3.type 
        FROM choices as t1
        INNER JOIN assertion_choices as t2
		INNER JOIN types as t3
        ON t2.choice_id = t1.id AND t2.assertion_id = ASSERTIONID AND t3.id = t1.type_id
		GROUP BY t1.answer_en;
       
      
END