using System;

namespace PA.WebAPI.Model
{
    public class Usuarios
    {
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

    }
}
