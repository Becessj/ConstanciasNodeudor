using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Notaria.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;


namespace Notaria.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors()]
    public class AuditoriasController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuditoriasController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /* [AllowAnonymous]

         [HttpPost]
         public JsonResult Post(Auditorias contribuyente)
         {
             string query = @"insert into dbo.AUDITNOTARIAS (CONTRIBUYENTE,PREDIO,USUARIO,TIPO,F_INGRESO) values (@CONTRIBUYENTE,@PREDIO,@USUARIO,@TIPO,@F_INGRESO)";
             DataTable table = new DataTable();
             string sqlDataSource = _configuration.GetConnectionString("Conexion");
             SqlDataReader myReader;
             using (SqlConnection myCon = new SqlConnection(sqlDataSource))
             {
                 myCon.Open();
                 using (SqlCommand myCommand = new SqlCommand(query, myCon))
                 {
                     myCommand.Parameters.Add("@CONTRIBUYENTE", SqlDbType.VarChar,30);
                     myCommand.Parameters["@CONTRIBUYENTE"].Value = (object)contribuyente.CONTRIBUYENTE;

                     myCommand.Parameters.Add("@PREDIO", SqlDbType.VarChar, 30);
                     myCommand.Parameters["@PREDIO"].Value = (object)contribuyente.PREDIO;

                     myCommand.Parameters.Add("@USUARIO", SqlDbType.VarChar, 11);
                     myCommand.Parameters["@USUARIO"].Value = (object)contribuyente.USUARIO;

                     myCommand.Parameters.Add("@TIPO", SqlDbType.VarChar, 1);
                     myCommand.Parameters["@TIPO"].Value = 'W';

                     myCommand.Parameters.Add("@F_INGRESO", SqlDbType.Date);
                     myCommand.Parameters["@F_INGRESO"].Value = Convert.ToDateTime(contribuyente.F_INGRESO);   

                     myReader = myCommand.ExecuteReader();
                     table.Load(myReader);
                     myReader.Close();
                     myCon.Close();
                 }

             }
             return new JsonResult(table);
         }*/
        [AllowAnonymous]
        [HttpPost]
        public JsonResult Post(Auditorias audit)

        {
            string query = @"exec auditoria_insertar_consulta @CONTRIBUYENTE,@PREDIO,@GENERADOR,@USUARIO";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    
                    myCommand.Parameters.Add("@CONTRIBUYENTE", SqlDbType.VarChar, 11);
                    myCommand.Parameters["@CONTRIBUYENTE"].Value = Convert.ToString(audit.CONTRIBUYENTE);

                    myCommand.Parameters.Add("@PREDIO", SqlDbType.VarChar, 10);
                    myCommand.Parameters["@PREDIO"].Value = Convert.ToString(audit.PREDIO);

                    myCommand.Parameters.Add("@GENERADOR", SqlDbType.VarChar, 10);
                    myCommand.Parameters["@GENERADOR"].Value = Convert.ToString(audit.GENERADOR);

                    myCommand.Parameters.Add("@USUARIO", SqlDbType.VarChar, 10);
                    myCommand.Parameters["@USUARIO"].Value = Convert.ToString(audit.USUARIO);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult(table);
        }


    }
}
