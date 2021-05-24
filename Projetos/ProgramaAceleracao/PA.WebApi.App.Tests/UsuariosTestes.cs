using System;
using Xunit;
using PA.WebApi.AuthProvider;
using PA.WebAPI.Model;
using PA.WebApi.AuthProvider.Validacao;

namespace PA.WebApi.App.Tests
{
    public class UsuariosTestes
    {
        [Theory]
        [InlineData(true, "admin", "123",false)]
        [InlineData(false, "paulo", "123",true)]
        public void ValidarExpiracaoUsuarioComExpiracaoAtivada(bool valorEsperado, string usuario, string senha, bool expiraSenhaAtivado)
        {

            // Arranje - cenário de entrada
            // 
            Usuarios user;
            if (expiraSenhaAtivado)
                user = new Usuarios()
                {
                    Id = 1,
                    UserName = usuario,
                    Password = senha,
                    IsAdmin = true,
                    ExpiracaoSenhaAtivada = expiraSenhaAtivado,
                    DataHoraUltimaAlteracaoSenha = new DateTime(2021,1,20)
                };
            else
                user = new Usuarios()
                {
                    Id = 1,
                    UserName = usuario,
                    Password = senha,
                    IsAdmin = true,
                    ExpiracaoSenhaAtivada = expiraSenhaAtivado,
                    DataHoraUltimaAlteracaoSenha = null
                };

            // Assert
            var valorObtido = Validacao.ValidarExpiracaoSenha(user);

            Assert.Equal(valorEsperado, valorObtido);

        }
    }
}
