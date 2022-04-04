using Estudo.Usuario.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Estudo.Usuario.Domain.Services
{
    public interface IUsuarioService
    {
        Usuarios CriarUsuario(Usuarios usuario);
        Usuarios EditarUsuario(Usuarios usuario);
        void ExcluirUsuario(int id);
        Usuarios BuscarPorId(int id);
        List<Usuarios> Buscar();
    }
}
