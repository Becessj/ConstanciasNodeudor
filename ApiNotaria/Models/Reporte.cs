using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notaria.Models
{
    public class Reporte
    {
        public string CONTRIBUYENTE { get; set; }

        public string PREDIO { get; set; }

        public string GENERADOR { get; set; }

        public string USUARIO { get; set; }

        public string TIPO { get; set; }

        public DateTime F_INGRESO { get; set; }
    }
}
