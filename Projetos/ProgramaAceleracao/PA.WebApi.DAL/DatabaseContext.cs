using Microsoft.EntityFrameworkCore;
using PA.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PA.WebApi.DAL
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<UsuariosPermissao> UsuariosPermissao { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            //irá criar o banco e a estrutura de tabelas necessárias
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UsuariosConfiguration());
            modelBuilder.ApplyConfiguration(new UsuariosPermissaoConfiguration());
        }
    }


}
