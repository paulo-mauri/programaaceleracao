using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Estudo.Tarefas.Api.UnitOfWork;
using Estudo.Tarefas.Api.Models;

namespace Estudo.Tarefas.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private IUnitOfWork _uow = null;
        public TarefasController(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
        }

        [HttpGet]
        public async Task<IEnumerable<Tarefa>> GetAll()
        {
            var result = await _uow.Tarefas.GetAll();
            return result;
        }

        [HttpGet("{id:int}")]
        public async Task<Tarefa> Get(int id)
        {
            var result = await _uow.Tarefas.Get(id);
            return result;
        }

        [HttpPost]
        public async Task<bool> AddTarefa(Tarefa tarefa)
        {
            _uow.BeginTransaction();
            var result = await _uow.Tarefas.Add(tarefa);
            _uow.Commit();
            return result > 0;
        }

        [HttpPut]
        public async Task<bool> UpdateTarefa(Tarefa tarefa)
        {
            _uow.BeginTransaction();
            var result = await _uow.Tarefas.Update(tarefa);
            _uow.Commit();
            return result > 0;
        }

        [HttpDelete("{id:int}")]
        public async Task<bool> DeleteTarefa(int id)
        {
            _uow.BeginTransaction();
            var result = await _uow.Tarefas.Delete(id);
            _uow.Commit();
            return result > 0;
        }
    }
}
