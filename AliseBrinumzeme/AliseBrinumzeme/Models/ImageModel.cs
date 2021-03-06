﻿using FluentValidation;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AliseBrinumzeme.Infrastructure;

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
        public string LargeImagePath { get; set; }
        public string ParameterPlaceHolder { get; set; }
        public string Parameters
        {
            get
            {
                return Helpers.GenerateKeyValue(ParameterPlaceHolder,new string[]{ ":" }, new string[] {"\r\n"});
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