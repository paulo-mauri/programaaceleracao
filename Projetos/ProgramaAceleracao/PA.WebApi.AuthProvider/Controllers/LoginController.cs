using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PA.WebApi.App.ViewModel;
using PA.WebApi.AuthProvider.Validacao;
using PA.WebApi.DAL;
using PA.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PA.WebApi.App.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class LoginController : ControllerBase
    {
         private readonly IRepository<Usuarios> _repo;

        public LoginController(IRepository<Usuarios> repository)
        {
            _repo = repository;
        }

        [HttpPost]
        [Route("/api/[controller]/Token")]
        public IActionResult Token(UsuariosViewModel model)
        {
            if (ModelState.IsValid)
            {
                var usuario = _repo.Find(x => x.UserName == model.UserName);

                if (usuario == null) return NotFound();

                //Validação simples de senha
                if (!Validacao.ValidarExpiracaoSenha(usuario))
                    return BadRequest("Senha Expirada");

                if (model.Password == usuario.Password)
                {
                    //var usuario = _repo.Find(model.UserName);
                    // cria token (header + payload >> claims + signature)

                    var direitos = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, model.UserName),
                        new Claim(ClaimTypes.Role, usuario.IsAdmin ? "Admin" : "User"),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                    var chave = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("matrix-pa-webapi-authentication-valid"));

                    var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: "Matrix.PA.WebApp",
                        audience: "Postman",
                        claims: direitos,
                        signingCredentials: credenciais,
                        expires: DateTime.Now.AddMinutes(30)
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(tokenString);
                }
                return Unauthorized(); //401
            }
            return BadRequest(); //400
        }
    }
}
