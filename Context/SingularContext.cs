using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace Context
{
    public class SingularContext : DbContext
    {
        public SingularContext(DbContextOptions<SingularContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies(); // Enable lazy loading
            base.OnConfiguring(optionsBuilder);
        }
       

        public DbSet<EmployeeUser> EmployeeUsers { get; set; }
        public DbSet<StoreItem> StoreItems { get; set; }
    }
}
