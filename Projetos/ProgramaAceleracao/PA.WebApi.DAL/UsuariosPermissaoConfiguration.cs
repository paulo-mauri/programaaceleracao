using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PA.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PA.WebApi.DAL
{
    public class UsuariosPermissaoConfiguration : IEntityTypeConfiguration<UsuariosPermissao>
    {
        public void Configure(EntityTypeBuilder<UsuariosPermissao> builder)
        {
            builder
                .ToTable("UsuariosPermissao");

            builder
                .Property(l => l.Id);

            builder.HasKey(l => l.Id).HasName("PK_UsuarioPermissao");

            builder
                .Property<int>("UsuarioId")
                .IsRequired();

            builder
                .Property<string>("Permissao")
                .HasColumnType("varchar(10)")
                .IsRequired();

        }
    }
}
