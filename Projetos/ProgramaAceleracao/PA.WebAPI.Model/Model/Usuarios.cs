using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PA.WebAPI.Model
{
    public class Usuarios
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool ExpiracaoSenhaAtivada { get; set; }
        public DateTime? DataHoraUltimaAlteracaoSenha { get; set; }

        //public IList<UsuarioPermissao> Permissoes { get; set; }
    }
}
