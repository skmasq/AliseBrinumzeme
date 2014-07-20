using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AliseBrinumzeme.Models;

namespace AliseBrinumzeme.Areas.Admin.Controllers
{
    public class ImageController : Controller
    {
        MainDataContext _db = new MainDataContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            var items = _db.Images.OrderByDescending(x => x.DateCreated).Select(x => new
            {
                ID = x.ID,
                ImageTitle = x.Title,
                Date = x.DateCreated
            });

            var returnItems = new List<object>();

            foreach (var item in items)
            {
                returnItems.Add(new
                {
                    ID = item.ID,
                    ImageTitle = item.ImageTitle,
                    Date = Convert.ToDateTime(item.Date).ToString("yyyy-MM-dd")
                });
            }

            return Json(returnItems, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            ViewBag.Section = _db.Sections.ToList();

            return View();
        }

        public ActionResult Edit(int id)
        {
            var image = _db.Images.FirstOrDefault(x => x.ID == id);
            image.Section = _db.Sections.Where(x => x.ID == id).FirstOrDefault();
            ViewBag.Images = image;
            ViewBag.Section = _db.Sections.ToList();
            return View(image);
        }

        public ActionResult Delete(int id)
        {
            var image = _db.Images.Single(x => x.ID == id);
            _db.Images.Remove(image);
            _db.SaveChanges();
            return RedirectToAction("index", "image");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(int SectionID, ImageModel Image, HttpPostedFileBase imageFile)
        {
            Image.DateCreated = DateTime.Now;
            Image.DateModified = DateTime.Now;
            Image.Section = _db.Sections.Where(x => x.ID == SectionID).FirstOrDefault();
            Image.Section.ID = SectionID;

            if (imageFile != null)
            {
                Image.ImagePath = Infrastructure.Upload.Image(imageFile, 665, 1000, 60);
            }

            if (TryValidateModel(Image))
            {
                _db.Images.Add(Image);
                _db.SaveChanges();
                return RedirectToAction("index", "image");
            }

            return View(Image);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int SectionID, ImageModel Image)
        {
            var image = _db.Images.Single(x => x.ID == Image.ID);
            image.Section = _db.Sections.Where(x => x.ID == SectionID).FirstOrDefault();
            image.Section.ID = SectionID;
            image.DateCreated = DateTime.Now;

            if (TryUpdateModel(image))
            {
                _db.SaveChanges();
                return RedirectToAction("index", "image");
            }

            return View(Image);
        }
	}
}