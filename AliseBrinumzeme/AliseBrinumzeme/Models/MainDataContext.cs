using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AliseBrinumzeme.Models
{
    public class MainDataContext : DbContext
    {
        public MainDataContext() :
            base("Name=Local") {
                Database.SetInitializer<MainDataContext>(new CreateDatabaseIfNotExists<MainDataContext>());
        }

        public DbSet<SectionModel> Sections { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<AdministratorModel> Administrators { get; set; }
    }
}