using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AliseBrinumzeme.Models
{
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
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string Description { get; set; }
        public virtual ICollection<ImageModel> Images { get; set; }
        public string ThumbnailPath { get; set; }


    }
}