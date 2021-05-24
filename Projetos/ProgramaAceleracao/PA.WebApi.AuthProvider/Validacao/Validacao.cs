using PA.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PA.WebApi.AuthProvider.Validacao
{
    public class Validacao
    {
        /// <summary>
        /// Validar Expiração de senha
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public static bool ValidarExpiracaoSenha(Usuarios usuario)
        {
            if (usuario.ExpiracaoSenhaAtivada) 
                if ((DateTime.Now - usuario.DataHoraUltimaAlteracaoSenha.Value).TotalDays >= 90)
                    {
                        return false;
                    }

            return true;
        }
    }
}
