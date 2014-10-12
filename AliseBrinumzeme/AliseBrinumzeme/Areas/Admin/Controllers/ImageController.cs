namespace AliseBrinumzeme.Areas.Admin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using AliseBrinumzeme.Models;
    using AliseBrinumzeme.Infrastructure.Repositories;
    using System.IO;
    using AliseBrinumzeme.Infrastructure;
    using AliseBrinumzeme.Infrastructure.RequireAuthorization;
    using System.Text;

    [RequireAuthorization]
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
                Order = x.Order,
                Preview = x.ImagePath
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
                    Order = item.Order,
                    Preview = item.Preview.Replace(".jpg", "_cropped.jpg")
                });
            }

            return Json(returnItems, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            ViewBag.Section = _db.Sections.ToList();
            return View();
        }

        public ActionResult Edit(int? id)
        {
            var image = _db.Images.FirstOrDefault(x => x.ID == id);
            image.Section = _db.Sections.Where(x => x.ID == id).FirstOrDefault();
            ViewBag.Images = image;
            ViewBag.Section = _db.Sections.ToList();
            return View(image);
        }

        public ActionResult Delete(int? id)
        {
            //Initialize file parameters
            ImageRepository.Instance.InitializeFileParameters();

            var image = _db.Images.Single(x => x.ID == id);

            var section = _db.Sections.Where(x => x.ID == image.SectionID).FirstOrDefault();
            Upload.RemoveOldImagesFromFolder(section.ID, id, true, true, true);
            _db.Images.Remove(image);
            _db.SaveChanges();

            var imagesList = _db.Images.OrderBy(x => x.Order).Where(x => x.SectionID == section.ID).ToList();
            var fileParams = ImageRepository.Instance.FileParameters;
            var stringB = new StringBuilder();

            section.ThumbnailPath = stringB
                   .Append(fileParams.NoExtensionName)
                   .Append("_thumbnail")
                   .Append(fileParams.FileExtension)
                   .ToString();

            //not working properly
            Upload.ResetOrder(imagesList, out imagesList);

            Upload.CombineAllImages(section.ID);

            _db.SaveChanges();
            stringB.Clear();

            return RedirectToAction("index", "image");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(int SectionID, ImageModel Image, HttpPostedFileBase imageFile)
        {
            //Initialize file parameters
            ImageRepository.Instance.InitializeFileParameters();

            var fileParams = ImageRepository.Instance.FileParameters;
            var stringB = new StringBuilder();
            var image = _db.Images.Create();

            image.Section = _db.Sections.Where(x => x.ID == SectionID).FirstOrDefault();
            image.DateCreated = DateTime.Now;
            image.DateModified = DateTime.Now;
            image.Section.ID = SectionID;
            image.SectionID = SectionID;
            image.Title = Image.Title;
            image.ParameterPlaceHolder = Image.ParameterPlaceHolder;
            
            if (imageFile != null)
            {
                image.ImagePath = fileParams.Name;

                image.Section.ThumbnailPath = stringB
                    .Append(fileParams.NoExtensionName)
                    .Append("_thumbnail")
                    .Append(fileParams.FileExtension)
                    .ToString();

                image.Order = (
                    from img in _db.Images
                    where img.SectionID == SectionID
                    select img).Count() + 1;

                Upload.ImageAdd(SectionID, imageFile, 665, 1000, 50L);
                Upload.RemoveOldImagesFromFolder(SectionID, Image.ID, true, false, false);
                Upload.CombineAllImages(SectionID);

                if (TryValidateModel(image))
                {
                    _db.Images.Add(image);
                    _db.SaveChanges();
                }
                return RedirectToAction("index", "image");
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int SectionID, ImageModel Image, HttpPostedFileBase imageFile)
        {
            //Initialize file parameters
            ImageRepository.Instance.InitializeFileParameters();
            var fileParams = ImageRepository.Instance.FileParameters;
            var image = _db.Images.Single(x => x.ID == Image.ID);
            var stringB = new StringBuilder();

            image.Section = _db.Sections.Where(x => x.ID == SectionID).FirstOrDefault();
            image.Section.ID = SectionID;
            image.DateCreated = DateTime.Now;
            image.Title = Image.Title;
            image.SectionID = SectionID;
            image.ParameterPlaceHolder = Image.ParameterPlaceHolder;

            if (imageFile != null)
            {
                image.ImagePath = fileParams.Name;

                image.Section.ThumbnailPath = stringB
                    .Append(fileParams.NoExtensionName)
                    .Append("_thumbnail")
                    .Append(fileParams.FileExtension)
                    .ToString();

                Upload.ImageAdd(SectionID, imageFile, 665, 1000, 60);
                Upload.RemoveOldImagesFromFolder(SectionID, Image.ID, true, true, true);
                Upload.CombineAllImages(SectionID, Image.ID); 
            }

            if (TryValidateModel(image))
            {
                _db.SaveChanges();
            }

            return RedirectToAction("index", "image");
        }

        public ActionResult IncreaseOrder(int id)
        {
            //not working properly
            DecreaseIncreaseOrder(id, true);
            return RedirectToAction("index", "image");
        }

        public ActionResult DecreaseOrder(int id)
        {
            //not working properly
            DecreaseIncreaseOrder(id, false);
            return RedirectToAction("index", "image");
        }

        /// <summary>
        /// Will increase current image order if 'increaseOrder' parameter is set to true
        /// else will decrease the image order
        /// </summary>
        /// <param name="id"></param>
        /// <param name="increaseOrder"></param>
        private void DecreaseIncreaseOrder(int id, bool increaseOrder)
        {
            //Initialize file parameters
            ImageRepository.Instance.InitializeFileParameters();

            var image = _db.Images.Single(x => x.ID == id);
            var fileParams = ImageRepository.Instance.FileParameters;
            var stringB = new StringBuilder();

            image.Section = _db.Sections.Where(x => x.ID == image.SectionID).FirstOrDefault();

            image.Section.ThumbnailPath = stringB
                   .Append(fileParams.NoExtensionName)
                   .Append("_thumbnail")
                   .Append(fileParams.FileExtension)
                   .ToString();

            if (increaseOrder)
                ImageRepository.Instance.ChangeOrder(id, true);         
            else
                ImageRepository.Instance.ChangeOrder(id, false);
            
            //Removes only previous thumbnail from folder
            Upload.RemoveOldImagesFromFolder(image.SectionID, id, true, false, false);
            //Creates thumbnail for all images for this section
            Upload.CombineAllImages(image.SectionID);

            _db.SaveChanges();
            stringB.Clear();
        }
	}
}