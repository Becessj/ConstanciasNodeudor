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
    // [EnableCors("AllowOrigin")]
    //Quito de todos los controladores el "AllowOrigin" generaba error en post
    [EnableCors()]
    public class PersonasController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PersonasController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpGet("{DNI}/{NOMBRE}/{CONTRIBUYENTE}")]
        public JsonResult Get(String DNI, String NOMBRE, String CONTRIBUYENTE)
        {
            string query = @"exec PRS_LISTAR_PERSONA_NOTARIOS @DNI,@NOMBRE,@CONTRIBUYENTE";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@DNI", SqlDbType.VarChar);
                    myCommand.Parameters["@DNI"].Value = DNI;

                    myCommand.Parameters.Add("@NOMBRE", SqlDbType.VarChar);
                    myCommand.Parameters["@NOMBRE"].Value = NOMBRE;

                    myCommand.Parameters.Add("@CONTRIBUYENTE", SqlDbType.VarChar);
                    myCommand.Parameters["@CONTRIBUYENTE"].Value = CONTRIBUYENTE;

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
