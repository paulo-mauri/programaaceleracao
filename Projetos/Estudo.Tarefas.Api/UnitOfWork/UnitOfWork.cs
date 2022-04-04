using Estudo.Tarefas.Api.Data;
using Estudo.Tarefas.Api.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Tarefas.Api.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly DBSession _session;
        public ITarefaRepository Tarefas { get; }

        public UnitOfWork(ITarefaRepository tarefaRepository, DBSession db)
        {
            Tarefas = tarefaRepository;
            _session = db;
        }

        public void BeginTransaction()
        {
            _session.Transaction = _session.Connection.BeginTransaction();

        }

        public void Commit()
        {
            _session.Transaction.Commit();
            Dispose();
        }

        public void Rollback()
        {
            _session.Transaction.Rollback();
            Dispose();
        }

        public void Dispose() => _session.Transaction?.Dispose();

    }
}
