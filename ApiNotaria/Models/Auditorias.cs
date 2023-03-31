using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace Notaria.Models
{
    public class Auditorias
    {
        [Key]
        public string CONTRIBUYENTE { get; set; }

        public string PREDIO { get; set; }

        public string GENERADOR { get; set; }

        public string USUARIO { get; set; }

    }
}
