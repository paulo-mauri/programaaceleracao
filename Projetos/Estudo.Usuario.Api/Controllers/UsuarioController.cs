using Estudo.Usuario.Domain.Entities;
using Estudo.Usuario.Domain.Interfaces.Dados;
using Estudo.Usuario.Domain.Services;
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
        public IActionResult Delete(Usuarios usuario)
        {
            _usuarioService.ExcluirUsuario(usuario);

            return Ok("Usuário excluído");
        }

        [HttpGet]
        public IActionResult Get(Usuarios usuario)
        {
            return Ok(_usuarioService.BuscarPorId(usuario));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_usuarioService.Buscar());
        }
    }
}
