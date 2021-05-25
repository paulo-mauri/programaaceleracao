using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PA.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PA.WebApi.DAL
{
    internal class UsuariosConfiguration : IEntityTypeConfiguration<Usuarios>
    {
        public void Configure(EntityTypeBuilder<Usuarios> builder)
        {
            builder
                .ToTable("Usuarios");

            builder
                .Property<int>(l => l.Id);

            builder.HasKey(l => l.Id).HasName("PK_Usuario");

            builder
                .Property(l => l.UserName)
                .HasColumnType("varchar(50)")
                .IsRequired();
            
            builder
                .HasIndex(u => u.UserName).IsUnique();

            builder
                .Property(l => l.Password)
                .HasColumnType("varchar(75)");

            builder
                .Property(l => l.Email)
                .HasColumnType("varchar(500)");

            builder
                .Property(l => l.IsAdmin)
                .HasColumnType("bit");

            builder
                .Property(l => l.DataHoraUltimaAlteracaoSenha)
                .HasColumnType("datetime");

            builder
                .Property(l => l.ExpiracaoSenhaAtivada)
                .HasColumnType("bit");
        }
    }
}
