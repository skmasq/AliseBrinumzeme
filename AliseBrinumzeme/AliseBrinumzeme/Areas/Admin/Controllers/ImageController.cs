using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AliseBrinumzeme.Models;
using AliseBrinumzeme.Infrastructure.Repositories;
using System.IO;
using AliseBrinumzeme.Infrastructure;

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
                Date = x.DateCreated,
                SectionTitle = x.Section.Title,
                Order = x.Order

            });

            var returnItems = new List<object>();

            foreach (var item in items)
            {
                returnItems.Add(new
                {
                    ID = item.ID,
                    ImageTitle = item.ImageTitle,
                    Date = Convert.ToDateTime(item.Date).ToString("yyyy-MM-dd"),
                    SectionTitle = item.SectionTitle,
                    Order = item.Order
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
            image.Section = _db.Sections.Where(x => x.ID == image.SectionID).FirstOrDefault();
            
            //Removes only previous thumbnail from folder
            Upload.RemoveOldImagesFromFolder(image.SectionID, id, true, true, true);
            _db.Images.Remove(image);
            _db.SaveChanges();
            //Creates instance of file parameters class
            var fileParams = ImageRepository.Instance.FileParameters;
            //Resets the images order so each value vould inc by one
            Upload.ResetOrder(image.SectionID);
            //Creates thumbnail for all images for this section
            Upload.CombineAllImages(image.SectionID);
            //Adds thumbnail's name to db
            image.Section.ThumbnailPath = fileParams.NoExtensionName + "_thumbnail" + fileParams.FileExtension;
            _db.SaveChanges();

            return RedirectToAction("index", "image");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(int SectionID, ImageModel Image, HttpPostedFileBase imageFile)
        {
            var image = _db.Images.Create();
            image.Section = _db.Sections.Where(x => x.ID == SectionID).FirstOrDefault();
            image.DateCreated = DateTime.Now;
            image.DateModified = DateTime.Now;
            image.Section.ID = SectionID;
            image.SectionID = SectionID;
            image.Title = Image.Title;
            
            if (imageFile != null)
            {
                //Removes only previous thumbnail from folder
                Upload.RemoveOldImagesFromFolder(SectionID, Image.ID, true, false, false);
                //Creates instance of file parameters class
                var fileParams = ImageRepository.Instance.FileParameters;
                //Adding new image to folder
                Upload.ImageAdd(SectionID, imageFile, 665, 1000, 60);
                //Adds image name to 'ImageModel'
                image.ImagePath = fileParams.Name;
               
                if (TryValidateModel(image))
                {
                    _db.Images.Add(image);
                    //Saves model to database so when combining images, current added image also would be added                
                    int imagesCount = (from img in _db.Images where img.SectionID == SectionID select img).Count();
                    image.Order = imagesCount;
                    _db.SaveChanges();
                    //Creates thumbnail for all images for this section
                    Upload.CombineAllImages(SectionID);
                    //Adds thumbnail name to 'ImageModel'
                    image.Section.ThumbnailPath = fileParams.NoExtensionName + "_thumbnail" + fileParams.FileExtension;
                    _db.SaveChanges();
                }

                return RedirectToAction("index", "image");
            }

            return View(Image);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int SectionID, ImageModel Image, HttpPostedFileBase imageFile)
        {
            var image = _db.Images.Single(x => x.ID == Image.ID);
            image.Section = _db.Sections.Where(x => x.ID == SectionID).FirstOrDefault();
            image.Section.ID = SectionID;
            image.DateCreated = DateTime.Now;
            image.Title = Image.Title;
            image.SectionID = SectionID;

            if (imageFile != null)
            {
                //Removes only previous thumbnail from folder
                Upload.RemoveOldImagesFromFolder(SectionID, Image.ID, true, true, true);
                //Creates instance of file parameters class
                var fileParams = ImageRepository.Instance.FileParameters;
                //Adding new image to folder
                Upload.ImageAdd(SectionID, imageFile, 665, 1000, 60);
                //Adds image name to 'ImageModel'
                image.ImagePath = fileParams.Name;

                if (TryValidateModel(image))
                {
                    //Saves model to database so when combining images, current added image also would be added
                    _db.SaveChanges();
                    //Creates thumbnail for all images for this section
                    Upload.CombineAllImages(SectionID);
                    //Adds thumbnail name to 'ImageModel'
                    image.Section.ThumbnailPath = fileParams.NoExtensionName + "_thumbnail" + fileParams.FileExtension;
                    _db.SaveChanges();
                }

                return RedirectToAction("index", "image");
            }

            return View(Image);
        }

        public ActionResult IncreaseOrder(int id)
        {
            var image = _db.Images.Single(x => x.ID == id);
            image.Section = _db.Sections.Where(x => x.ID == image.SectionID).FirstOrDefault();

            //changes the image order 'increasing'
            ImageRepository.Instance.IncreasingOrder(id);

            //Removes only previous thumbnail from folder
            Upload.RemoveOldImagesFromFolder(image.SectionID, id, true, false, false);

            //Creates instance of file parameters class
            var fileParams = ImageRepository.Instance.FileParameters;

            //Creates thumbnail for all images for this section
            Upload.CombineAllImages(image.SectionID);

            //Adds thumbnail name to 'ImageModel'
            image.Section.ThumbnailPath = fileParams.NoExtensionName + "_thumbnail" + fileParams.FileExtension;
            _db.SaveChanges();

            return RedirectToAction("index", "image");
        }

        public ActionResult DecreaseOrder(int id)
        {
            var image = _db.Images.Single(x => x.ID == id);
            image.Section = _db.Sections.Where(x => x.ID == image.SectionID).FirstOrDefault();

            //changes the image order 'increasing'
            ImageRepository.Instance.DecreasingOrder(id);

            //Removes only previous thumbnail from folder
            Upload.RemoveOldImagesFromFolder(image.SectionID, id, true, false, false);

            //Creates instance of file parameters class
            var fileParams = ImageRepository.Instance.FileParameters;

            //Creates thumbnail for all images for this section
            Upload.CombineAllImages(image.SectionID);

            //Adds thumbnail name to 'ImageModel'
            image.Section.ThumbnailPath = fileParams.NoExtensionName + "_thumbnail" + fileParams.FileExtension;
            _db.SaveChanges();

            return RedirectToAction("index", "image");
        }
	}
}