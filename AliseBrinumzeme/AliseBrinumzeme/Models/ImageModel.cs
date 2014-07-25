using FluentValidation;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AliseBrinumzeme.Models
{
    [Validator(typeof(ImageValidator))]
    public class ImageModel
    {
        public int ID { get; set; }
        public int SectionID { get; set; }
        public int Order { get; set; }
        public string Title { get; set; }
        public string TitleSlug
        {
            get
            {
                return Infrastructure.Helpers.GenerateSlug(this.Title);
            }
        }
        public string ImagePath { get; set; }
        public string Params { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public virtual SectionModel Section { get; set; }
    }

    public class ImageValidator : AbstractValidator<ImageModel>
    {
        public ImageValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required field");
            RuleFor(x => x.ImagePath).NotEmpty().WithMessage("Image is required");
        }
    }
}