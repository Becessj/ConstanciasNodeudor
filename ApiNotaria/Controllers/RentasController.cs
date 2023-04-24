using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Notaria.Context;
using Notaria.Models;

namespace Notaria.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors()]
    public class RentasController : Controller
    {
        private readonly IConfiguration _configuration;

        public RentasController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
     

        [AllowAnonymous]
        [HttpGet("{username}/{password}")]
        public JsonResult Get(string username, string password)
        {
            string query = @"EXEC LoginRentas @username,@password";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Conexion");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@username", SqlDbType.NVarChar);
                    myCommand.Parameters["@username"].Value = username;

                    myCommand.Parameters.Add("@password", SqlDbType.NVarChar);
                    myCommand.Parameters["@password"].Value = password;

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
