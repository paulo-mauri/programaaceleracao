using Estudo.Usuario.Domain.Interfaces.Dados;
using Estudo.Usuario.Domain.Services;
using Estudo.Usuario.Infra;
using Estudo.Usuario.Infra.Repositories.UsuarioRepository;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Estudo.Usuario.IoC
{
    public static class DependencyInjectionConfig
    {
        public static void ResolveDependencies(this IServiceCollection services)
        {
            #region Banco de Dados
            services.AddDbContext<DatabaseContext>();
            #endregion

            #region Infra
            services.AddScoped<IUsuariosRepository, UsuariosRepository>();
            #endregion

            #region Serviços
            services.AddScoped<IUsuarioService, UsuarioService>();
            #endregion
        }
    }
}
