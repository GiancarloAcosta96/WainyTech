using Microsoft.EntityFrameworkCore;
using WayniTech.Entities;

namespace WayniTech.Data
{
    public class WayniDbContext : DbContext
    {
        public WayniDbContext(DbContextOptions<WayniDbContext> options) :base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
               .HasKey(u => u.UserId);
        }
    }
}
