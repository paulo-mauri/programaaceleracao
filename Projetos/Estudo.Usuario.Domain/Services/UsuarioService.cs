using Estudo.Usuario.Domain.Entities;
using Estudo.Usuario.Domain.Interfaces.Dados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Estudo.Usuario.Domain.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuariosRepository _usuarioRepository;

        public UsuarioService(IUsuariosRepository usuariosRepository)
        {
            _usuarioRepository = usuariosRepository;
        }

        public List<Usuarios> Buscar()
        {
            return _usuarioRepository.GetAll();
        }

        public Usuarios BuscarPorId(int id)
        {
            return _usuarioRepository.Get(id);
        }

        public Usuarios CriarUsuario(Usuarios usuario)
        {
            return _usuarioRepository.Create(usuario);
        }

        public Usuarios EditarUsuario(Usuarios usuario)
        {
            return _usuarioRepository.Update(usuario);
        }

        public void ExcluirUsuario(int id)
        {
            _usuarioRepository.Delete(id);
        }
    }
}
