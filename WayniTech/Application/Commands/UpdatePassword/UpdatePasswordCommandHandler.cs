using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WayniTech.Data;

namespace WayniTech.Application.Commands.UpdatePassword
{
    public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand, Unit>
    {
        private readonly WayniDbContext _dbContext;

        public UpdatePasswordCommandHandler(WayniDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
        {
            var usuario = await _dbContext.Usuarios
                .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken);

            if (usuario == null)
            {
                throw new Exception("El usuario no existe");
            }

            // Verify the old password
            var oldPasswordHash = HashPassword(request.OldPassword);
            if (usuario.Password != oldPasswordHash)
            {
                throw new Exception("La contraseña actual es incorrecta");
            }

            // Hash the new password and update
            usuario.Password = HashPassword(request.NewPassword);

            _dbContext.Usuarios.Update(usuario);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var builder = new StringBuilder();
                foreach (var c in bytes)
                {
                    builder.Append(c.ToString("x2"));
                }

                return builder.ToString();
            }
        }
    }
}
