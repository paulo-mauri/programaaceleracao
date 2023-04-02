using DevIO.Api.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;
using DevIO.Api.Extensions;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace DevIO.Api.Configuration
{
    public static class IdentityConfig
    {
        public static IServiceCollection AddIdenityConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<IdentityUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddErrorDescriber<IdentityMensagensPortugues>()
                    .AddDefaultTokenProviders();

            // JWT

            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;         // requerer somente via https
                options.SaveToken = true;                    // token deve ser salvo em http properties após sucesso
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,                        // valida se o issuer que emite tem que ser o mesmo que recebe o token
                    IssuerSigningKey = new SymmetricSecurityKey(key),       // chave que valida o issuer (criptografado)
                    ValidateIssuer = true,                                  // valida o issuer
                    ValidateAudience = true,                                // aonde seu token é valide em qual audiencia
                    ValidAudience = appSettings.ValidoEm,                   // aonde seu token e valido ex: https://localhost (configurado no appsettings.json)
                    ValidIssuer = appSettings.Emissor                       // Emissor nome da aplicação
                };
            });

            return services;
        }
    }
}
