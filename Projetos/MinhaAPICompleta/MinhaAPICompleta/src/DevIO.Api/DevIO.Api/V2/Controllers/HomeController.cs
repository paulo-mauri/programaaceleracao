using DevIO.Api.Controllers;
using DevIO.Business.Intefaces;
using Microsoft.AspNetCore.Mvc;

namespace DevIO.Api.V2.Controllers
{
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/home")]
    public class HomeController : MainController
    {
        private readonly ILogger _logger;

        public HomeController(INotificador notificador, IUser appUser, ILogger<HomeController> logger) : base(notificador, appUser)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Valor()
        {
            _logger.LogTrace("Log de Trace");   // log para desenvolvimento - log minimo
            _logger.LogDebug("Log de Debug");   // log para desenvolvimento - log minimo
            _logger.LogInformation("Log de Informação"); // log para aplicação
            _logger.LogWarning("Log de Aviso"); // log para aplicação - não é um erro e não deveria acontecer
            _logger.LogError("Log de Erro");    // log para aplicação
            _logger.LogCritical("Log de Problema Critico"); // log para aplicação -- nivel acima do erro - saude da aplicação

            return "Sou a V2";
        }
    }
}
