namespace AliseBrinumzeme.Migrations
{
    using AliseBrinumzeme.Models;
    using SimpleCrypto;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MainDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MainDataContext context)
        {
            ICryptoService cryptoService = new PBKDF2();

            var admin = new AdministratorModel()
            {
                Username = "admin",
                Password = cryptoService.Compute("admin"),
                PasswordSalt = cryptoService.Salt
            };

            context.Administrators.AddOrUpdate(x => x.Username, admin);

            #region Sections

            context.Sections.AddOrUpdate(x => x.Title, new SectionModel()
            {
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Description = "",
                Title = "Pasākumu Organizēšana",
            });

            context.Sections.AddOrUpdate(x => x.Title, new SectionModel()
            {
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Description = "",
                Title = "Grimms",
            });

            context.Sections.AddOrUpdate(x => x.Title, new SectionModel()
            {
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Description = "",
                Title = "Karnevālu tērpu un aksesuāru noma",
            });

            context.Sections.AddOrUpdate(x => x.Title, new SectionModel()
            {
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Description = "",
                Title = "Idejas",
            });

            #endregion
        }
    }
}
