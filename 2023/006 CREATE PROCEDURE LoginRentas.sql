ALTER PROCEDURE LoginRentas
@USUARIO VARCHAR(30),
@CLAVE VARCHAR(50)
AS
BEGIN
 select * 
 from USUARIO 
 where usuario = @USUARIO and clave= @CLAVE
 and AREA IN ('PREDIAL','RENTAS','ARBITRIOS','NOTARIAS')
 ;

END

--  EXEC LoginRentas 'ADMIN','ADMIN'
-- SELECT * FROM USUARIO
  