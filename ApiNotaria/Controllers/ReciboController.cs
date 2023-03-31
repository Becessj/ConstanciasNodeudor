using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Notaria.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors()]
    public class ReciboController : Controller
    {
        private readonly IConfiguration _configuration;
        public ReciboController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpGet("{CONTRIBUYENTE}/{GENERADOR}/{DATO}")]
        public JsonResult Get(String CONTRIBUYENTE, String GENERADOR, String DATO)
        {
            string query = @"EXEC NOTARIAS_RECIBO @CONTRIBUYENTE,@GENERADOR,@DATO";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@CONTRIBUYENTE", SqlDbType.VarChar);
                    myCommand.Parameters["@CONTRIBUYENTE"].Value = CONTRIBUYENTE;

                    myCommand.Parameters.Add("@GENERADOR", SqlDbType.VarChar);
                    myCommand.Parameters["@GENERADOR"].Value = GENERADOR;

                    myCommand.Parameters.Add("@DATO", SqlDbType.VarChar);
                    myCommand.Parameters["@DATO"].Value = DATO;

                    

                    

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
