using Estudo.Usuario.Domain.Entities;
using Estudo.Usuario.Domain.Interfaces.Dados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Estudo.Usuario.Domain.Services
{
    public class ProdutoService : IProdutosService
    {
        private readonly IRepository<Produtos> _serviceRepository;
        public ProdutoService(IRepository<Produtos> serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        public IQueryable<Produtos> All()
        {
            return _serviceRepository.All;
        }

        public void Alterar(params Produtos[] obj)
        {
            _serviceRepository.Alterar(obj);
        }

        public void Excluir(params Produtos[] obj)
        {
            _serviceRepository.Excluir(obj);
        }

        public Produtos Find(int key)
        {
            return _serviceRepository.Find(key);
        }

        public Produtos Find(Func<Produtos, bool> predicate)
        {
            return _serviceRepository.Find(predicate);
        }

        public void Incluir(params Produtos[] obj)
        {
            _serviceRepository.Incluir(obj);
        }
    }
}
