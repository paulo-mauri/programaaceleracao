using Microsoft.EntityFrameworkCore;

namespace MinhaApiCore.Model
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions options) : base(options) { }   

        public DbSet<Fornecedor> Fornecedores { get; set;}
    }
}
