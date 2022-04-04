using Estudo.Usuario.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Estudo.Usuario.Domain.Interfaces.Dados
{
    public interface IUsuariosRepository
    {
        public Usuarios Create(Usuarios usuario);
        public Usuarios Update(Usuarios usuario);
        public void Delete(int id);
        public Usuarios Get(int id);
        public List<Usuarios> GetAll();

    }
}
