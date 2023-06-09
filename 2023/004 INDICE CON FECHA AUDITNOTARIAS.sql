/*
   miércoles, 29 de marzo de 202311:28:02
   User: sa
   Server: PC-218\SQL2014
   Database: RENTAS_SANTIAGO
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.AUDITNOTARIAS
	DROP CONSTRAINT PK__AUDITNOT__86182A9860C9FE3C
GO
ALTER TABLE dbo.AUDITNOTARIAS ADD CONSTRAINT
	PK__AUDITNOT__86182A9860C9FE3C PRIMARY KEY CLUSTERED 
	(
	CONTRIBUYENTE,
	F_INGRESO
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.AUDITNOTARIAS SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.AUDITNOTARIAS', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.AUDITNOTARIAS', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.AUDITNOTARIAS', 'Object', 'CONTROL') as Contr_Per 