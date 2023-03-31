using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notaria.Context;
using Notaria.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentasController : Controller
    {
        private readonly AppDbContext _context;

        public RentasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]

        [EnableCors("AllowAll")]
        public async Task<ActionResult<IEnumerable<Rentas>>> Getrentas()
        {
            return await _context.Rentas.ToListAsync();
        }



        [HttpGet("{username}/{password}")]
        public ActionResult<List<Usuarios>> GetIniciarSesion(string username, string password)
        {
            var rentas = _context.Rentas.Where(renta => renta.RENTAS.Equals(username) && renta.CLAVE.Equals(password)).ToList();
            //SELECT * FROM  VS_CONTRIBUYENTE_CLAVE
            if (rentas == null)
            {
                return NotFound();
            }
            Response.Headers.Add("Access-Control-Allow-Origin", "http://10.0.0.215:3000");
            Console.WriteLine("si entró compilado 2");
            return rentas;
        }
        //*****************************************************************

    }
}
