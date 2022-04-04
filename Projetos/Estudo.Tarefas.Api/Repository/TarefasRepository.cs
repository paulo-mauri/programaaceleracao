using Dapper;
using Estudo.Tarefas.Api.Data;
using Estudo.Tarefas.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Tarefas.Api.Repository
{
    public class TarefasRepository : ITarefaRepository
    {
        private DBSession _session;

        public TarefasRepository(DBSession db)
        {
            _session = db;
        }

        public async Task<int> Add(Tarefa entity)
        {
            entity.DataCriacao = DateTime.Now;
            entity.DataModificacao = null;
            var sql = "INSERT INTO Tarefas (Nome, Descricao, Status, DataConclusao, DataCriacao, DataModificacao) " +
                      "Values (@Nome, @Descricao, @Status, @DataConclusao, @DataCriacao, @DataModificacao);";

            var result = await _session.Connection.ExecuteAsync(sql, entity, _session.Transaction);
            return result;
        }

        public async Task<int> Delete(int id)
        {
            var sql = "DELETE FROM Tarefas WHERE Id = @Id;";
            var result = await _session.Connection.ExecuteAsync(sql, new { Id = id }, _session.Transaction);
            return result;
        }

        public async Task<Tarefa> Get(int id)
        {
            var sql = "SELECT * FROM Tarefas WHERE Id = @Id;";
            var result = await _session.Connection.QueryAsync<Tarefa>(sql, new { Id = id }, _session.Transaction);
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Tarefa>> GetAll()
        {
            var sql = "SELECT * FROM Tarefas;";
            var result = await _session.Connection.QueryAsync<Tarefa>(sql, _session.Transaction);
            return result;
        }

        public async  Task<int> Update(Tarefa entity)
        {
            entity.DataModificacao = DateTime.Now;
            var sql = "UPDATE Tarefas SET Nome = @Nome, Descricao = @Descricao, Status = @Status, DataConclusao = @DataConclusao, DataModificacao = @DataModificacao WHERE Id = @Id; ";

            var result = await _session.Connection.ExecuteAsync(sql, entity, _session.Transaction);
            return result;
        }
    }
}
