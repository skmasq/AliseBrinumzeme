using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using FluentValidation.Attributes;

namespace AliseBrinumzeme.Models
{
    [Validator(typeof(SectionValidator))]
    public class SectionModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string TitleSlug
        {
            get
            {
                return Infrastructure.Helpers.GenerateSlug(this.Title);
            }
        }
        public string Description { get; set; }
        public string ThumbnailPath { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public virtual ICollection<ImageModel> Images { get; set; }
    }

    public class SectionValidator : AbstractValidator<SectionModel>
    {
        public SectionValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required field.");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required field.");
            RuleFor(x => x.ThumbnailPath).NotEmpty().WithMessage("Thumbnail is required field.");
        }
    }
}