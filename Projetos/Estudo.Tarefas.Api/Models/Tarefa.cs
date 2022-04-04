using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Tarefas.Api.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public StatusTarefa Status { get; set; }
        public DateTime DataConclusao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataModificacao { get; set; }
    }

    public enum StatusTarefa
    {
        Criada,
        Ativa,
        Concluida,
        Cancelada
    }
}
