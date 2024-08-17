using MediatR;
using Microsoft.EntityFrameworkCore;
using WayniTech.Data;

namespace WayniTech.Application.Queries.GetUsuarios
{
    public class GetUsuariosQueryHandler : IRequestHandler<GetUsuariosQuery, List<GetUsuariosDTO>>
    {
        private readonly WayniDbContext _context;

        public GetUsuariosQueryHandler(WayniDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetUsuariosDTO>> Handle(GetUsuariosQuery request, CancellationToken cancellationToken)
        {
            var usuarios = await _context.Usuarios
                .Select(u => new GetUsuariosDTO
                {
                    UserId = u.UserId == null ? Guid.Empty : u.UserId,
                    Name = u.Name == null ? "" : u.Name,
                    UserName = u.UserName == null ? "" : u.UserName,
                    Email = u.Email == null ? "" : u.Email,
                    PhoneNumber = u.PhoneNumber == null ? "" : u.PhoneNumber,
                    Password = u.Password == null ? "" : u.Password,
                    Notification = u.Notification,
                }).ToListAsync(cancellationToken);

            return usuarios;
        }
    }
}
