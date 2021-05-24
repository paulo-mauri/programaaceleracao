using System;
using System.Collections.Generic;
using System.Text;

namespace PA.WebAPI.Model
{
    public class UsuariosPermissao
    {
        public int Id { get; set; }
        public Usuarios Usuario { get; set; } 
        public string Permissao { get; set; }
    }
}
