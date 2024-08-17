using MediatR;

namespace WayniTech.Application.Commands.UpdatePassword
{
    public class UpdatePasswordCommand : IRequest<Unit>
    {
        public Guid UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}

