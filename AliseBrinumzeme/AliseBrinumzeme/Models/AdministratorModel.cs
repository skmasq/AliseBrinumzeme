using FluentValidation;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AliseBrinumzeme.Models
{
    [Validator(typeof(AdministratorValidator))]
    public class AdministratorModel
    {
        public virtual int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
    }

    public class AdministratorValidator : AbstractValidator<AdministratorModel>
    {
        public AdministratorValidator()
        {
            RuleFor(x => x.Password).NotEmpty().WithMessage("Username is required field");
            RuleFor(x => x.Username).NotEmpty().WithMessage("Password is required field");
        }
    }
}
