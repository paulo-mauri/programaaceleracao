﻿using DevIO.Api.Extensions;
using DevIO.Business.Intefaces;
using DevIO.Business.Notificacoes;
using DevIO.Business.Services;
using DevIO.Data.Context;
using DevIO.Data.Repository;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace DevIO.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            // AddScoped() - existe somente uma instancia do objeto durante a Request
            services.AddScoped<MeuDbContext>();
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<IFornecedorRepository,FornecedorRepository>();
            services.AddScoped<IEnderecoRepository, EnderecoRepository>();

            services.AddScoped<INotificador, Notificador>();
            services.AddScoped<IFornecedorService, FornecedorService>();
            services.AddScoped<IProdutoService, ProdutoService>();
            
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();  // AddSingleton() para a aplicação toda
            services.AddScoped<IUser, AspNetUser>();

            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            return services;
        }
    }
}
