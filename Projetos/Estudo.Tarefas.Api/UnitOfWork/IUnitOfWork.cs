using Estudo.Tarefas.Api.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Tarefas.Api.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        ITarefaRepository Tarefas { get; }
        void BeginTransaction();
        void Commit();
        void Rollback();
    }
}
