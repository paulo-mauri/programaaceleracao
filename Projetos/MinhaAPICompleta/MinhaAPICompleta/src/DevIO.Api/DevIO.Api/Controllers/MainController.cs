using DevIO.Business.Intefaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using DevIO.Business.Notificacoes;
using System.Runtime.InteropServices.ObjectiveC;

namespace DevIO.Api.Controllers
{
    [ApiController]
    public abstract class MainController : ControllerBase
    {
        // validacao de notificacoes de erro
        // validacao de modelstate
        // validacao da operacao de negocios
        private readonly INotificador _notificador;

        public readonly IUser AppUser;
        protected Guid UsuarioId { get; set; }
        protected bool UsuarioAutenticado { get; set; }

        public MainController(INotificador notificador, 
                              IUser appUser)
        {
            _notificador = notificador;
            AppUser = appUser;

            if (appUser.IsAuthenticated())
            {
                UsuarioId = appUser.GetUserId();
                UsuarioAutenticado = true;
            }
        }

        protected bool OperacaoValida()
        {
            return !_notificador.TemNotificacao();
        }
        protected ActionResult CustomResponse(object? result = null)
        {
            if (OperacaoValida())
            {
                return Ok(new
                {
                    sucess = true,
                    data = result
                });
            }
                
            return BadRequest(new
                {
                    sucess = false,
                    errors = _notificador.ObterNotificacoes().Select(n => n.Mensagem)
                }); 
        }

        protected ActionResult CustomResponse(ModelStateDictionary modelState) 
        { 
            if (!modelState.IsValid)
            {
                NotificarErroModelInvalida(modelState);
            }

            return CustomResponse();
        }


        protected void NotificarErroModelInvalida(ModelStateDictionary modelState)
        {
            var erros = modelState.Values.SelectMany(e => e.Errors);
            foreach(var erro in erros) 
            { 
                var errorMessage = erro.Exception == null ? erro.ErrorMessage : erro.Exception.Message;
                NotificarErro(errorMessage);
            }
        }

        protected void NotificarErro(string mensagem)
        {
            _notificador.Handle(new Notificacao(mensagem));
        }

    }

}
