
using Dapper;
using Estudo.WebApi.Dapper.Models;
using System.Data.SqlClient;

namespace Estudo.WebApi.Dapper.Respository;
public class FilmeRepository : IFilmeRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString = string.Empty;

    public FilmeRepository(IConfiguration configuration)
    {
        this._configuration = configuration;    
        _connectionString = _configuration.GetConnectionString("SqlConnection");
    }

    public async Task<IEnumerable<FilmeResponse>> BuscaFilmesAsync()
    {
        using var con = new SqlConnection(_connectionString);
        string sql = @"select f.ID ID, f.Nome NOME, f.ANO ANO, p.NOME PRODUTORA from TBFILME f INNER JOIN TBPRODUTORA p ON f.IDPRODUTORA = p.ID";

        return await con.QueryAsync<FilmeResponse>(sql);
    }

    public async Task<FilmeResponse> BuscaFilmeAsync(int id)
    {
        using var con = new SqlConnection(_connectionString);
        string sql = @"select f.ID ID, f.Nome NOME, f.ANO ANO, p.NOME PRODUTORA from TBFILME f INNER JOIN TBPRODUTORA p ON f.IDPRODUTORA = p.ID where f.ID = @Id";

        return await con.QueryFirstOrDefaultAsync<FilmeResponse>(sql, new { Id = id });
    }
    
    public async Task<bool> AdicionaAsync(FilmeRequest request)
    {
        using var con = new SqlConnection(_connectionString);
        string sql = "INSERT INTO TBFILME (NOME, ANO, IDPRODUTORA) VALUES (@Nome, @Ano, @IdProdutora)";

        return (await con.ExecuteAsync(sql, request) > 0);
    }

    
    public async Task<bool> AtualizaAsync(FilmeRequest request, int id)
    {
        using var con = new SqlConnection(_connectionString);
        string sql = "UPDATE TBFILME SET NOME = @Nome, ANO = @Ano WHERE ID=@Id";

        var parametros = new DynamicParameters();
        parametros.Add("Nome", request.Nome);
        parametros.Add("Ano", request.Ano);
        parametros.Add("Id", id);

        return (await con.ExecuteAsync(sql,parametros) > 0);
    }

    
    public async Task<bool> DeletarAsync(int id)
    {
        using var con = new SqlConnection(_connectionString);
        string sql = "DELETE FROM TBFILME WHERE ID=@Id";

        var parametros = new DynamicParameters();
        parametros.Add("Id", id);

        return (await con.ExecuteAsync(sql, parametros) > 0);
    }

}
