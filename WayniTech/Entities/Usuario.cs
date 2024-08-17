namespace WayniTech.Entities
{
    public class Usuario
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public Boolean Notification { get; set; }
    }
}
