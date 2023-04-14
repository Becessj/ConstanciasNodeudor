using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notaria.Context;
using Notaria.Models;

namespace Notaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContribuyentesController
    {
        private readonly AppDbContext _context;
        public ContribuyentesController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Contrubuyentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contribuyentes>>> Getcontribuyentes()
        {
            //return await _context.Usuarios.ToListAsync();
            return await _context.Contribuyentes.ToListAsync();
        }

        [HttpGet("{username}/{password}")]
        public ActionResult<List<Contribuyentes>> GetIniciarSesion(string username, string password)
        {
            var contribuyentes = _context.Contribuyentes.Where(contribuyente => contribuyente.CONTRIBUYENTE.Equals(username)
            && contribuyente.CLAVE.Equals(password)).ToList();
            if (contribuyentes == null)
            {
                return NotFound();
            }
            Console.WriteLine("si entró");
            return contribuyentes;
        }

        private ActionResult<List<Contribuyentes>> NotFound()
        {
            throw new NotImplementedException();
        }
        
    }
}
