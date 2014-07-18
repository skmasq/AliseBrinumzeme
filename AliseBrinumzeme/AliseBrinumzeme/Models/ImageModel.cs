using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AliseBrinumzeme.Models
{
    public class ImageModel
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

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int Order { get; set; }
        public string ImagePath { get; set; }
        public string Params { get; set; }
    }
}