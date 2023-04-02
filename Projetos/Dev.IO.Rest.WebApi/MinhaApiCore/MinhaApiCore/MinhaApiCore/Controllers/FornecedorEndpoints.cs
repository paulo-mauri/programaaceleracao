using Microsoft.EntityFrameworkCore;
using MinhaApiCore.Model;
namespace MinhaApiCore.Controllers;

public static class FornecedorEndpoints
{
    public static void MapFornecedorEndpoints (this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/Fornecedor", async (ApiDbContext db) =>
        {
            return await db.Fornecedores.ToListAsync();
        })
        .WithName("GetAllFornecedors")
        .Produces<List<Fornecedor>>(StatusCodes.Status200OK);

        routes.MapGet("/api/Fornecedor/{id}", async (Guid Id, ApiDbContext db) =>
        {
            return await db.Fornecedores.FindAsync(Id)
                is Fornecedor model
                    ? Results.Ok(model)
                    : Results.NotFound();
        })
        .WithName("GetFornecedorById")
        .Produces<Fornecedor>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        routes.MapPut("/api/Fornecedor/{id}", async (Guid Id, Fornecedor fornecedor, ApiDbContext db) =>
        {
            var foundModel = await db.Fornecedores.FindAsync(Id);

            if (foundModel is null)
            {
                return Results.NotFound();
            }
            
            db.Update(fornecedor);

            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("UpdateFornecedor")
        .Produces(StatusCodes.Status404NotFound)
        .Produces(StatusCodes.Status204NoContent);

        routes.MapPost("/api/Fornecedor/", async (Fornecedor fornecedor, ApiDbContext db) =>
        {
            db.Fornecedores.Add(fornecedor);
            await db.SaveChangesAsync();
            return Results.Created($"/Fornecedors/{fornecedor.Id}", fornecedor);
        })
        .WithName("CreateFornecedor")
        .Produces<Fornecedor>(StatusCodes.Status201Created);

        routes.MapDelete("/api/Fornecedor/{id}", async (Guid Id, ApiDbContext db) =>
        {
            if (await db.Fornecedores.FindAsync(Id) is Fornecedor fornecedor)
            {
                db.Fornecedores.Remove(fornecedor);
                await db.SaveChangesAsync();
                return Results.Ok(fornecedor);
            }

            return Results.NotFound();
        })
        .WithName("DeleteFornecedor")
        .Produces<Fornecedor>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);
    }
}
