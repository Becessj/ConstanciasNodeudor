using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebReserva.Models
{
    public class Personas
    {
        public string DNI { get; set; }

        public string NOMBRE { get; set; }

        public string CONTRIBUYENTE { get; set; }
    }
}
