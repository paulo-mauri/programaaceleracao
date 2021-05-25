using System;
using System.Linq;
using System.Linq.Expressions;

namespace PA.WebApi.DAL
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> All { get; }
        TEntity Find(int key);
        TEntity Find(Func<TEntity,bool> func);
        void Incluir(params TEntity[] obj);
        void Alterar(params TEntity[] obj);
        void Excluir(params TEntity[] obj);
    }
}
