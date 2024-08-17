using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WayniTech.Data;
using WayniTech.Entities;

namespace WayniTech.Application.Commands.CrearUsuario
{
    public class CrearUsuarioCommandHandler : IRequestHandler<CrearUsuarioCommand, Unit>
    {
        private readonly WayniDbContext _dbContext;
        public CrearUsuarioCommandHandler( WayniDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public async Task<Unit> Handle(CrearUsuarioCommand request, CancellationToken cancellationToken)
        {
            var existeUsuario = await _dbContext.Usuarios
                .AnyAsync(p => p.Name == request.Name
                && p.UserName == request.UserName, cancellationToken
                );
            if (existeUsuario) 
            {
                throw new Exception("Ya existe un personal con ese nombre");
            }

            var passwordHash = HashPassword(request.Password);

            var usuario = new Usuario
            {
                Name = request.Name,
                UserName = request.UserName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Password = passwordHash,
                Notification = true,
            };

            _dbContext.Add(usuario);
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
