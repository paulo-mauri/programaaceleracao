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
                .Property(l => l.Usuario)
                .HasColumnType("varchar(50)")
                .IsRequired();

            builder.HasKey(l => l.Usuario).HasName("PK_Usuario");

            builder
                .Property(l => l.Password)
                .HasColumnType("varchar(75)");

            builder
                .Property(l => l.Email)
                .HasColumnType("varchar(500)");

            builder
                .Property(l => l.IsAdmin)
                .HasColumnType("bit");
        }
    }
}
