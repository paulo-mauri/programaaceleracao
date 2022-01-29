//using Estudo.Usuario.Api;
using Estudo.Usuario.Domain.Entities;
using Estudo.Usuario.Domain.Interfaces.Dados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Estudo.Usuario.Infra.Repositories.UsuarioRepository
{
    public class UsuariosRepository : IUsuariosRepository
    {
        private readonly DatabaseContext _context;

        public UsuariosRepository(DatabaseContext context)
        {
            this._context = context;
        }

        public Usuarios Create(Usuarios usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return usuario;
        }

        public void Delete(Usuarios usuario)
        {
            _context.Usuarios.Remove(usuario);
            _context.SaveChanges();

        }

        public Usuarios Get(Usuarios usuario)
        {
            return _context.Usuarios.FirstOrDefault(u => u.Id == usuario.Id);
        }

        public List<Usuarios> GetAll()
        {
            return _context.Usuarios.ToList();
        }

        public Usuarios Update(Usuarios usuario)
        {
            _context.Usuarios.Update(usuario);
            _context.SaveChanges();

            return usuario;
        }
    }
}
