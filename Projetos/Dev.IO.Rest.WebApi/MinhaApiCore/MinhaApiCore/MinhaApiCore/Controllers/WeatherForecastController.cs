using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace MinhaApiCore.Controllers
{
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Route("[controller]")]
    public class WeatherForecastController : MainController
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching", "PICLES"
        };
            
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherActionResult")]
        public ActionResult<IEnumerable<WeatherForecast>> GetWeatherActionResult()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("{value}", Name = "GetWeather")]
        public IEnumerable<WeatherForecast> GetWeather(int value)
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost(Name = "Post")]
        public void Post([FromBody] string value)
        {

        }

        [HttpPost("{valor}",Name = "Grava")]
        //[ProducesResponseType(typeof(Product),StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesDefaultResponseType]
        [ApiConventionMethod(typeof(DefaultApiConventions),
                            nameof(DefaultApiConventions.Post))] // essa linha substitui as comentadas acima do metodo da api
        public ActionResult Post(Product product) // o tipo complexo não precisa dizer que vem do FromBody
        {

            if (product.Id == null) return BadRequest();

            // add no banco

            // retorno do asp.net
            //return CreatedAtAction("Post", product);

            // retorno do asp.net
            //return CreatedAtAction(nameof(Post), product);

            // Retorno Customizado
            //return Ok(product);
            return CreatedAtAction(nameof(Post), product);
            //return CustomResponse(product);
        }

        //[HttpPost(Name = "GravarProdutoForm")]
        //public ActionResult Post([FromForm]Product value) // o tipo complexo não precisa dizer que vem do FromBody
        //{

        //    return Ok();
        //}


        [HttpPut("{id}",Name="Update")] // pode ser implicito, não precisa marcar o FromRoute do id
        //[ApiConventionMethod(typeof(DefaultApiConventions),
        //                    nameof(DefaultApiConventions.Put))]
        public ActionResult Put([FromRoute] int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest();

            if (id != product.Id) return NotFound();
            // add no banco

            // retorno do asp.net
            //return CreatedAtAction("Post", product);

            // retorno do asp.net
            //return CreatedAtAction(nameof(Post), product);

            // Retorno Customizado
            return NoContent();
        }


        //[HttpPut("{id}", Name = "Update")] // pode ser implicito, não precisa marcar o FromRoute do id
        //public void Grava([FromRoute] int id, [FromForm] string value)
        //{

        //}

        [HttpDelete]
        public void Delete([FromRoute] int id)
        {

        }
    }

    [ApiController]
    public abstract class MainController : ControllerBase
    {
        // criando action result customizado
        protected ActionResult CustomResponse(object result = null)
        {
            if (OperacaoValida())
            {
                return Ok(new
                {
                    sucess = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                sucess = false,
                errors = ObterErros()
            });    
        }

        protected bool OperacaoValida()
        {
            //validacoes a criar

            return true;
        }

        protected string ObterErros()
        {
            return "";
        }

    }

    public class Product
    {
        public long? Id { get; set; }
        public string? Name { get; set; }    
    }
}