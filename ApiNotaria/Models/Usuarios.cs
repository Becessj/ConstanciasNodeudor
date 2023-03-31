﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Notaria.Models
{
    [Table("NOTARIA")]
    public class Usuarios
    {
        [Key]
        public string USUARIO { get; set; }
        public string NOMBRE { get; set; }
        public string CLAVE { get; set; }
        public string DIRECCION { get; set; }
        public string EMAIL { get; set; }
        public string OBS { get; set; }
        public char E { get; set; }
        public string USUARIO_CREA { get; set; }
        public DateTime F_CREA { get; set; }
        public string USUARIO_MODIFICA { get; set; }
        public DateTime F_MODIFICA { get; set; }
    }
}
