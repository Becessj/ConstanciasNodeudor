using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebReserva.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Net.Http;
using System.Net;

namespace Notaria.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors()]
    public class NotariasController : Controller
    {
        private readonly IConfiguration _configuration;

        public NotariasController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpGet("{PERSONA}/{NRODOC}/{GENERADOR}/{CLAVE}")]
        public JsonResult Get(String PERSONA, String NRODOC, String GENERADOR, String CLAVE)
        {
            string query = @"exec NOTARIAS @PERSONA,@NRODOC,@GENERADOR,@CLAVE";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@PERSONA", SqlDbType.VarChar);
                    myCommand.Parameters["@PERSONA"].Value = PERSONA;

                    myCommand.Parameters.Add("@NRODOC", SqlDbType.VarChar);
                    myCommand.Parameters["@NRODOC"].Value = NRODOC;

                    myCommand.Parameters.Add("@GENERADOR", SqlDbType.VarChar);
                    myCommand.Parameters["@GENERADOR"].Value = GENERADOR;

                    myCommand.Parameters.Add("@CLAVE", SqlDbType.VarChar);
                    myCommand.Parameters["@CLAVE"].Value = CLAVE;

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
