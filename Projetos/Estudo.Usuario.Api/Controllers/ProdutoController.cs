using Estudo.Usuario.Domain.Entities;
using Estudo.Usuario.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Usuario.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutosService _produtoService;

        public ProdutoController(IProdutosService produtosService )
        {
            _produtoService = produtosService;
        }

        [HttpPost]
        public IActionResult Create(Produtos produto)
        {
            _produtoService.Incluir(produto);

            return Ok(produto);
        }

        [HttpPut]
        public IActionResult Update(Produtos produto)
        {
            _produtoService.Alterar(produto);

            return Ok(produto);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _produtoService.Excluir(_produtoService.Find(id));

            return Ok(new { mensagem = "Usuario Excluído" });
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var produto = _produtoService.Find(id);

            return Ok(produto);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var produtos = _produtoService.All();

            return Ok(produtos);
        }
    }
}
