using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PA.WebApi.App.ViewModel;
using PA.WebApi.DAL;
using PA.WebAPI.App;
using PA.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PA.WebApi.App.Controllers
{
    [ApiController]
    [Authorize]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "v1")]
    [Route("api/v{version:apiVersion}/Usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly IRepository<Usuarios> _repo;

        public UsuariosController(IRepository<Usuarios> repository)
        {
            _repo = repository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("Get")]
        [ProducesResponseType(statusCode: 200, type: typeof(Usuarios))]
        [ProducesResponseType(statusCode: 500, type: typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Get(UsuariosViewModel user)
        {
            if(ModelState.IsValid)
            {
                var usuario = _repo.Find(x => x.UserName == user.UserName);
                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }
            return BadRequest();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            var lista = _repo.All;
            if (lista == null)
            {
                return NotFound();
            }
            return Ok(lista);
        }


        [HttpPost]
        public IActionResult Novo(Usuarios model)
        {
            if (ModelState.IsValid)
            {
                _repo.Incluir(model);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        public IActionResult Alterar(Usuarios usuario)
        {
            if (usuario == null)
            {
                return NotFound();
            }

            _repo.Alterar(usuario);
            return Ok();
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public IActionResult Remover(Usuarios user)
        {
            var usuario = _repo.Find(x => x.UserName == user.UserName);
            if (usuario == null)
            {
                return NotFound();
            }

            _repo.Excluir(usuario);
            return Ok();
        }

    }
}
