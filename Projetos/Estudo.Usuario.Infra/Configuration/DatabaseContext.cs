using Estudo.Usuario.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Usuario.Infra
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Usuarios> Usuarios { get; set; }

        public DbSet<Produtos> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Usuarios>();

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Usuarios).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Produtos).Assembly);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Data Source = WIN-42R2FRJMM3L; Initial Catalog = EstudoUsuario; User ID = sa; Password = mauri#22");
        }
    }
}
