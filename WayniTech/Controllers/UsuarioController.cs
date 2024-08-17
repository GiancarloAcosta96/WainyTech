using MediatR;
using Microsoft.AspNetCore.Mvc;
using WayniTech.Application.Commands.CrearUsuario;
using WayniTech.Application.Commands.UpdatePassword;
using WayniTech.Application.Commands.UpdateUsuarios;
using WayniTech.Application.Queries.GetUsuarios;

namespace WayniTech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController: ControllerBase
    {
        private readonly IMediator mediator;

        public UsuarioController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // POST: api/Usuario
        [HttpPost]
        public async Task<IActionResult> CreateUsuario([FromBody] CrearUsuarioCommand command, CancellationToken cancellationToken)
        {
            if (command == null)
            {
                return BadRequest("Error en la data.");
            }
            await mediator.Send(command, cancellationToken);
            return Ok();
        }

        // GET: api/Usuario/Usuarios
        [HttpGet("")]
        public async Task<IActionResult> GetUsuarios(CancellationToken cancellationToken)
        {
            var query = new GetUsuariosQuery();
            var result = await mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        // PUT: api/Personal/ActualizarUsuario
        [HttpPut("UpdateUsuario")]
        public async Task<IActionResult> UpdateProducto([FromBody] UpdateUsuarioCommand command, CancellationToken cancellationToken)
        {
            if (command == null || command.UserId == Guid.Empty)
            {
                return BadRequest("Datos inválidos.");
            }

            try
            {
                await mediator.Send(command, cancellationToken);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Usuario/UpdateContraseña
        [HttpPut("UpdatePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] UpdatePasswordCommand command, CancellationToken cancellationToken)
        {
            await mediator.Send(command, cancellationToken);
            return Ok("Password cambiada correctamente");
        }
    }
}
