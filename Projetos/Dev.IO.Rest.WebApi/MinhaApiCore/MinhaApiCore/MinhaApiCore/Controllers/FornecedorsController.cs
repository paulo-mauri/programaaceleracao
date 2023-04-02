using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MinhaApiCore.Model;

namespace MinhaApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public FornecedorsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: Fornecedors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> Get()
        {
            return await _context.Fornecedores.ToListAsync();
        }

        // GET: Fornecedors/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedor>> Get(Guid id)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(id); 

            if (fornecedor == null)
                return NotFound();  

            return fornecedor;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, Fornecedor fornecedor)
        {
            if (id != fornecedor.Id)
            {
                return BadRequest();
            }

            _context.Entry(fornecedor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();  
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FornecedorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Fornecedor>> Post(Fornecedor fornecedor)
        {
            _context.Fornecedores.Add(fornecedor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(actionName: "Get", routeValues: new { id = fornecedor.Id }, value: fornecedor);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Fornecedor>> Delete(Guid id)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(id); 
            if (fornecedor == null)
                return NotFound();

            _context.Fornecedores.Remove(fornecedor);   
            await _context.SaveChangesAsync();

            return fornecedor;
        }

        private bool FornecedorExists(Guid id)
        {
          return _context.Fornecedores.Any(e => e.Id == id);
        }
    }
}
