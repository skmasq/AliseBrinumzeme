using AliseBrinumzeme.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AliseBrinumzeme.Controllers
{
    public class SectionApiController : ApiController
    {
        MainDataContext _db = new MainDataContext();

        public string Get(int? id)
        {
            var returnObject = new
            {
                i = new List<object>(),
                t = ""
            };

            if (id == null) { return Infrastructure.Helpers.SerializeObject(returnObject, false); }

            SectionModel section = _db.Sections.Single(x => x.ID == id);

            if (section == null) { return Infrastructure.Helpers.SerializeObject(returnObject, false); }

            foreach (var image in section.Images)
            {
                returnObject.i.Add(new
                {
                    u = image.ImagePath,
                    o = image.Order,
                    ts = image.TitleSlug,
                    id = image.ID
                });
            }

            return "value";
        }
    }
}