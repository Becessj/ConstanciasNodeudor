using Notaria.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notaria.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Auditorias> Auditorias { get; set; }
        public DbSet<Contribuyentes> Contribuyentes { get; set; }
        public object Rentas { get; internal set; }
    }
}
