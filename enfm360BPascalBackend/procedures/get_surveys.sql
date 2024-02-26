CREATE DEFINER=`root`@`localhost` PROCEDURE `get_surveys`(IN STARTS int, IN LIMITS int, IN ORDERS varchar(3))
BEGIN
		select * FROM surveys s
        ORDER BY s.updated_at ASC
        LIMIT LIMITS;
END