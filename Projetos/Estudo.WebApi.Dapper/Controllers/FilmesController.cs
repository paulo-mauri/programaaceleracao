using Estudo.WebApi.Dapper.Models;
using Estudo.WebApi.Dapper.Respository;
using Microsoft.AspNetCore.Mvc;

namespace Estudo.WebApi.Dapper.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilmesController : ControllerBase
{
    private readonly IFilmeRepository _filmeRepository;
    public FilmesController(IFilmeRepository repository)
    {
        this._filmeRepository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var filmes = await _filmeRepository.BuscaFilmesAsync();

        return filmes.Any() ?  Ok(filmes) : NoContent();
    }

    [HttpGet]
    [Route("api/[controller]/{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var filme = await _filmeRepository.BuscaFilmeAsync(id);

        return filme != null 
                ? Ok(filme) 
                : NotFound("Filme n�o encontrado");
    }

    [HttpPost]
    public async  Task<IActionResult> Post(FilmeRequest request)
    {
        if(string.IsNullOrEmpty(request.Nome))
        {
            return BadRequest("Nome Inv�lido");
        }

        if(request.Ano <= 0)
        {
            return BadRequest("Ano Inv�lido");
        }

        if (request.IdProdutora <= 0)
        {
            return BadRequest("Produtora Inv�lida");
        }

        var adicionado = await _filmeRepository.AdicionaAsync(request);

        return adicionado
            ? Ok("Filme adicionado com sucesso")
            : BadRequest("N�o foi possivel adicionar o filme");

    }

    [HttpPut]
    public async Task<IActionResult> Put(FilmeRequest request, int id)
    {
        if(id <= 0)
        {
            return BadRequest("Filme inv�lido");
        }

        var filme = await _filmeRepository.BuscaFilmeAsync(id);

        if(filme == null)
        {
            return NotFound("Filme n�o existe");
        }

        if (string.IsNullOrEmpty(request.Nome))
        {
            return BadRequest("Informa��o Inv�lida");
        }

        if (request.Ano <= 0)
        {
            return BadRequest("Informa��o Inv�lida");
        }

        if (request.IdProdutora <= 0)
        {
            return BadRequest("Informa��o Inv�lida");
        }

        var atualizado = await _filmeRepository.AtualizaAsync(request, id);

        return atualizado
            ? Ok("Filme atualizado com sucesso")
            : BadRequest("N�o foi possivel atualizar o filme");
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0)
        {
            return BadRequest("Filme inv�lido");
        }

        var filme = await _filmeRepository.BuscaFilmeAsync(id);

        if (filme == null)
        {
            return NotFound("Filme n�o existe");
        }

        var excluido = await _filmeRepository.DeletarAsync(id);

        return excluido
            ? Ok("Filme exclu�do")
            : BadRequest("N�o foi possivel excluir o filme");
    }


}
