using Estudo.Usuario.Domain.Entities;
using Estudo.Usuario.Domain.Interfaces.Dados;
using Estudo.Usuario.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Usuario.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public UsuarioController(IUsuarioService usuarioService)
        {
            this._usuarioService = usuarioService;
        }

        [HttpPost]
        public IActionResult Create(Usuarios usuario)
        {

            _usuarioService.CriarUsuario(usuario);

            return Ok(usuario);
        }

        [HttpPut]
        public IActionResult Update(Usuarios usuario)
        {
            _usuarioService.EditarUsuario(usuario);

            return Ok(usuario);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _usuarioService.ExcluirUsuario(id);

            return Ok(new { mensagem="Usuario Excluído"});
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            return Ok(_usuarioService.BuscarPorId(id));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_usuarioService.Buscar());
        }
    }
}
