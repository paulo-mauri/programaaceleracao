using DevIO.Api.Extensions;
using DevIO.Api.ViewModels;
using DevIO.Business.Intefaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors;
using DevIO.Api.Controllers;

namespace DevIO.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}")]
    // [DisableCors]  // ninguem de fora da aplicação vai chamar a api
    public class AuthController : MainController
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AppSettings _appSettings;
        private readonly ILogger _logger;

        public AuthController(INotificador notificador,
                              SignInManager<IdentityUser> signInManager,
                              UserManager<IdentityUser> userManager,
                              IOptions<AppSettings> appSettings,
                              IUser user,
                              ILogger<AuthController> logger) : base(notificador, user)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _logger = logger;
        }

        [HttpPost("nova-conta")]
        public async Task<ActionResult> Registrar(RegisterUserViewModel registerUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var user = new IdentityUser()
            {
                UserName = registerUser.Email,  // o identity não obriga a usar o email como nome de usuario, 
                Email = registerUser.Email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user: user, isPersistent: false);
                return CustomResponse(await GerarJwt(registerUser.Email));
            }

            foreach (var error in result.Errors)
            {
                NotificarErro(error.Description);
            }

            return CustomResponse(registerUser);
        }

        [HttpPost("entrar")]
        public async Task<ActionResult> Login(LoginUserViewModel loginUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var result = await _signInManager.PasswordSignInAsync(userName: loginUser.Email, 
                                                                  password: loginUser.Password, 
                                                                  isPersistent: false, 
                                                                  lockoutOnFailure: true);

            if (result.Succeeded) 
            {
                _logger.LogInformation($"Usuário logado {loginUser.Email} com Sucesso");
                return CustomResponse(await GerarJwt(loginUser.Email));
            }

            if (result.IsLockedOut)
            {
                NotificarErro("Usuário temporariamente bloqueado por tentativas inválidas");
                return CustomResponse(loginUser);
            }

            NotificarErro("Usuário ou Senha incorretos");
            return CustomResponse(loginUser);
        }

        private async Task<LoginResponseViewModel> GerarJwt(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var claims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);

            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, user.Id));
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString())) ;
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));

            foreach(var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor()
            {
                Issuer = _appSettings.Emissor,
                Audience = _appSettings.ValidoEm,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiracaoHoras),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            });

            var encodedToken = tokenHandler.WriteToken(token);

            var response = new LoginResponseViewModel()
            {
                AcessToken = encodedToken,
                ExpiresIn = TimeSpan.FromHours(_appSettings.ExpiracaoHoras).TotalSeconds,
                UserToken = new UserTokenViewModel()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Claims = claims.Select(c => new ClaimViewModel { Type = c.Type, Value = c.Value })
                }
            };

            return response;
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970,1,1,0,0,0,TimeSpan.Zero)).TotalSeconds);

    }
}
