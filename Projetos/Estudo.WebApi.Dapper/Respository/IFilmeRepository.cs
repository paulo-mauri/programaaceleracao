
using Estudo.WebApi.Dapper.Models;

namespace Estudo.WebApi.Dapper.Respository;
public interface IFilmeRepository
{
    Task<IEnumerable<FilmeResponse>> BuscaFilmesAsync();
    Task<FilmeResponse> BuscaFilmeAsync(int id);
    Task<bool> AdicionaAsync(FilmeRequest request);
    Task<bool> AtualizaAsync(FilmeRequest request, int id);
    Task<bool> DeletarAsync(int id);
}
