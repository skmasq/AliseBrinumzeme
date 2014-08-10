namespace AliseBrinumzeme.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Drawing.Drawing2D;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Web;
    using System.Linq;
    using AliseBrinumzeme.Infrastructure.Repositories;
    using AliseBrinumzeme.Models;
    using System.Text;
    using AliseBrinumzeme.Models.Properties;

    public static class Upload
    {
        /// <summary>
        /// Create image into folder
        /// </summary>
        /// <param name="file">Image file</param>
        /// <param name="height">Height to resize</param>
        /// <param name="width">Width to resize</param>
        /// <returns>Returns file name on success, null on failure</returns>
        public static void ImageAdd(int sectionID, HttpPostedFileBase file, int width, int height, long quality = 100L)
        {
            ImageRepository.Instance.AddNewImage(file, new Size(width, height), quality, 
                ImageRepository.Instance.FileParameters.Name);
        }

        /// <summary>
        /// Deletes old images from folder for current section id
        /// </summary>
        /// <param name="sectionID">Section ID</param>
        /// <param name="imageID">Image ID</param>
        /// <param name="deleteThumbnail">To enable thumbnail deletion set true</param>
        /// <param name="deleteLargeImage">To enable large image deletion set true</param>
        /// <param name="deleteCroppedImg">To enable cropped image deletion set true</param>
        public static void RemoveOldImagesFromFolder(int sectionID, int? imageID, bool delThumb, bool delLargeImage, bool delCroppedImg)
        {
            using (var _db = new MainDataContext())
            {
                var fileParams = ImageRepository.Instance.FileParameters;
                var section = (from s in _db.Sections where s.ID == sectionID select s).FirstOrDefault();
                var image = (from i in _db.Images where i.ID == imageID select i).FirstOrDefault();
                var stringB = new StringBuilder();

                if (section != null)
                {
                    string joinedThumbnail = stringB.Append(fileParams.Path).Append(section.ThumbnailPath).ToString();

                    //deletes previous '_thumbnail' for current section
                    if (System.IO.File.Exists(joinedThumbnail) && delThumb)
                        System.IO.File.Delete(
                            stringB.Clear().Append(fileParams.Path).Append(section.ThumbnailPath).ToString()
                            );
                }           

                if (image != null)
                {
                    var imageName = image.ImagePath.Replace(fileParams.FileExtension, "");
                    string img = stringB.Clear().Append(fileParams.Path).Append(image.ImagePath).ToString();
                    string croppedImage = stringB.Clear().Append(fileParams.Path)
                        .Append(imageName).Append("_cropped").Append(fileParams.FileExtension).ToString();

                    //Delete previous 'Image' for current section
                    if (System.IO.File.Exists(img) && delLargeImage)
                        System.IO.File.Delete(img);

                    //Delete previous '_cropped' image for current section
                    if (System.IO.File.Exists(croppedImage) && delCroppedImg)
                        System.IO.File.Delete(croppedImage);

                    stringB.Clear();
                }
            }
        }  

        /// <summary>
        /// Joins all thumbnails into one image
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        public static void CombineAllImages(int SectionID, int? imageID = 0)
        {
            var fileParams = ImageRepository.Instance.FileParameters;
            var StringB = new StringBuilder();

            //get all images for this section and order them by img.Order
            var images = (from img in ImageRepository.Instance._db.Images 
                          orderby img.Order 
                          where img.Section.ID == SectionID 
                          select img);

            //if edit operation is executed
            if (imageID != 0)
            {
                foreach (var img in images)
                {
                    if (img.ID == imageID)
                        img.ImagePath = fileParams.Name;
                }
            }

            string[] files = new string[images.Count() + 1];
            string fullPath = "";

            if (images != null)
            {
                int counter = 0;
                //adds all cropped images from db to files array if exists into folder
                foreach (var img in images)
                {
                    fullPath = StringB.Clear().Append(fileParams.Path)
                        .Append(img.ImagePath.Replace(fileParams.FileExtension, ""))
                        .Append("_cropped").Append(fileParams.FileExtension).ToString();
                    if (File.Exists(fullPath)) 
                        files[counter++] = fullPath; 
                }

                //if create operation is executed
                if (imageID == 0)
                {
                    fullPath = StringB.Clear().Append(fileParams.Path)
                        .Append(fileParams.NoExtensionName)
                        .Append("_cropped").Append(fileParams.FileExtension).ToString();
                    if (File.Exists(fullPath))
                        files[counter++] = fullPath; 
                }

                //removing null values
                files = files.Where(x => !string.IsNullOrEmpty(x)).ToArray();
                if (files.Count() == 0)
                    return;

                //combine them into one image
                Bitmap stitchedImage = ImageRepository.Instance.Combine(files);
                if (stitchedImage == null)
                    return;

                ImageRepository.Instance.SaveImageByType(stitchedImage, fileParams.Path,
                    fileParams.Name, 100, ImageType.JoinedThumbnails);

                StringB.Clear();
            }
        }

        /// <summary>
        /// Resets the order, thats all..
        /// </summary>
        /// <param name="sectionID"></param>
        public static void ResetOrder(List<ImageModel> imagesList, out List<ImageModel> reorderedImageList)
        {
            for (int i = 0; i < imagesList.Count(); i++)
            {
                imagesList[i].Order = i + 1;
            }
            reorderedImageList = imagesList;
        }
    }
}