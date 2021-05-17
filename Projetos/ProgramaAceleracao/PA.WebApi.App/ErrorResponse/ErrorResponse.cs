using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PA.WebAPI.App
{
    public class ErrorResponse
    {
        public int codigo { get; set; }
        public string message { get; set; }
        public ErrorResponse innererror { get; set; }
        public string[] detalhes { get; set; }

        public static ErrorResponse From(Exception e)
        {
            if (e == null)
            {
                return null;
            }
            return new ErrorResponse
            {
                codigo = e.HResult,
                message = e.Message,
                innererror = ErrorResponse.From(e.InnerException)
            };
        }
    
        public static ErrorResponse FromModelState(ModelStateDictionary modelState)
        {
            var erros = modelState.Values.SelectMany(m => m.Errors);
            return new ErrorResponse
            {
                codigo = 100,
                message = "Houve um erro(s) no envio da requisição.",
                detalhes = erros.Select(e => e.ErrorMessage).ToArray()
            };
        }
    }
}
