using Estudo.Usuario.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Estudo.Usuario.Domain.Services
{
    public interface IService<TEntity> where TEntity : class
    {
        public IQueryable<TEntity> All();
        public void Alterar(params TEntity[] obj);
        public void Excluir(params TEntity[] obj);
        public TEntity Find(int key);
        public TEntity Find(Func<TEntity, bool> predicate);
        public void Incluir(params TEntity[] obj);
    }
}
