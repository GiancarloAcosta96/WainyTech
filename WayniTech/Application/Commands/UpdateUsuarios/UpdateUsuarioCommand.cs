using MediatR;

namespace WayniTech.Application.Commands.UpdateUsuarios
{
    public class UpdateUsuarioCommand: IRequest<Unit>
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
    }
}
