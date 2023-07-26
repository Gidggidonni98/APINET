using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using API_REST_DOTNET.Models;


namespace API_REST_DOTNET{
    public class ApplicationDbContext : DbContext{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){

        }
        public DbSet<Comment>? Comments {get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Comment>().HasData(
                new Comment(){
                    Id = 1,
                    Title = "Test",
                    Description = "Test",
                    Author = "Andrea",
                    CreatedAt = new DateTime()
                },
                new Comment(){
                    Id = 2,
                    Title = "Test",
                    Description = "Test",
                    Author = "maria ",
                    CreatedAt = new DateTime()
                }
            );
        }
        
    }
}