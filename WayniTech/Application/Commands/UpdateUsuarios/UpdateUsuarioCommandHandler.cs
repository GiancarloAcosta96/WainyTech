using MediatR;
using System.Security.Cryptography;
using WayniTech.Data;

namespace WayniTech.Application.Commands.UpdateUsuarios
{
    public class UpdateUsuarioCommandHandler : IRequestHandler<UpdateUsuarioCommand, Unit>
    {
        private readonly WayniDbContext _dbContext;

        public UpdateUsuarioCommandHandler(WayniDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateUsuarioCommand request, CancellationToken cancellationToken)
        {
            var usuario = await _dbContext.Usuarios.FindAsync(request.UserId);
            if (usuario == null)
            {
                throw new Exception("El usuario no existe");
            }

            usuario.Name = request.Name;
            usuario.UserName = request.UserName;

            _dbContext.Usuarios.Update(usuario);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
