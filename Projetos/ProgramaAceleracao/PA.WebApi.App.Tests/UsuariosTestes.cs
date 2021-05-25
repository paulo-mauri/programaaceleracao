using System;
using Xunit;
using System.Net.Http;
using System.Net;
using PA.WebApi.App.ViewModel;

namespace PA.WebApi.App.Tests
{
    public class UsuariosTestes
    {
        [Theory]
        [InlineData(HttpStatusCode.OK, "admin", "123")]
        [InlineData(HttpStatusCode.BadRequest, "paulo", "123")]
        public void ValidarExpiracaoUsuarioComExpiracaoAtivada(HttpStatusCode httpstatusCode, string usuario, string senha)
        {
            //Arranje - cenário de entrada
            UsuariosViewModel user = new UsuariosViewModel() { UserName = usuario, Password = senha };

            //Act
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:6000/api/Login/");
            var resposta = httpClient.PostAsJsonAsync("Token", user).Result;

            //Assert
            var valorObtido = resposta.StatusCode;

            Assert.Equal(httpstatusCode, valorObtido);

        }
    }
}
