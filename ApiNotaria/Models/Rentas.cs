using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Notaria.Models
{
    [Table("USUARIO")]
    public class Rentas
    {
        [Key]
        public string USUARIO { get; set; }
        public string NOMBRE { get; set; }
        public string CLAVE { get; set; }
        public string DIRECCION { get; set; }
        public string TELEFONO { get; set; }
        public string EMAIL { get; set; }
        public string OBS { get; set; }
        public string TIPO { get; set; }
        public char E { get; set; }
        public string AGNO { get; set; }
        public string CENTRAL { get; set; }
        public string AREA { get; set; }
        public byte[] FOTO { get; set; }
        public string USUARIO_CREA { get; set; }
        public DateTime F_CREA { get; set; }
        public string USUARIO_MODIFICA { get; set; }
        public DateTime F_MODIFICA { get; set; }
        public string MODIFICA_CONTRIBUYENTE { get; set; }
        public string ACTUALIZA_PREDIAL { get; set; }
        public string ACTUALIZA_CUENTAS_ANTERIORES { get; set; }
        public string CON_VAUCHER { get; set; }
    }
}
