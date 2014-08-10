namespace AliseBrinumzeme.Areas.Admin.Controllers
{
    using AliseBrinumzeme.Infrastructure.RequireAuthorization;
    using AliseBrinumzeme.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    [RequireAuthorization]
    public class SectionController : Controller
    {
        MainDataContext _db = new MainDataContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            var items = _db.Sections.OrderByDescending(x => x.DateCreated).Select(x => new
            {
                ID = x.ID,
                SectionTitle = x.Title,
                Date = x.DateModified
            });

            var returnItems = new List<object>();

            foreach (var item in items)
            {
                returnItems.Add(new
                {
                    ID = item.ID,
                    SectionTitle = item.SectionTitle,
                    Date = Convert.ToDateTime(item.Date).ToString("yyyy-MM-dd")
                });
            }

            return Json(returnItems, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Edit(int? id)
        {
            var section = _db.Sections.FirstOrDefault(x => x.ID == id);

            return View(section);
        }

        public ActionResult Delete(int? id)
        {
            var section = _db.Sections.Single(x => x.ID == id);
            _db.Sections.Remove(section);
            _db.SaveChanges();
            return RedirectToAction("index", "section");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(SectionModel Section)
        {
            var section = _db.Sections.Single(x => x.ID == Section.ID);

            section.DateModified = DateTime.Now;
            section.Title = Section.Title;
            section.Description = Section.Description;

            if (TryUpdateModel(section))
            {
                _db.SaveChanges();
                return RedirectToAction("index", "section");
            }

            return View(Section);
        }
	}
}