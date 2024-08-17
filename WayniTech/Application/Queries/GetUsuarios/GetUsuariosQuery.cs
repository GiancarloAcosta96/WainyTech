using MediatR;

namespace WayniTech.Application.Queries.GetUsuarios
{
    public class GetUsuariosQuery : IRequest<List<GetUsuariosDTO>>
    {
    }
}
