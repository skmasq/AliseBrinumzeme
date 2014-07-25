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

namespace AliseBrinumzeme.Infrastructure
{
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
            //Crops, resizes and saves image to folder
            ImageRepository.Instance.AddNewImage(file, new Size(width, height), quality, ImageRepository.Instance.FileParameters.Name);
        }

        /// <summary>
        /// Deletes old images from folder for current section id
        /// </summary>
        /// <param name="sectionID">Section ID</param>
        /// <param name="imageID">Image ID</param>
        /// <param name="deleteThumbnail">To enable thumbnail deletion set true</param>
        /// <param name="deleteLargeImage">To enable large image deletion set true</param>
        /// <param name="deleteCroppedImg">To enable cropped image deletion set true</param>
        public static void RemoveOldImagesFromFolder(int sectionID, int imageID, bool delThumb, bool delLargeImage, bool delCroppedImg)
         {
            //Initialize file parameters
            ImageRepository.Instance.InitializeFileParameters();

            using (var _db = new MainDataContext())
            {
                var fileParams = ImageRepository.Instance.FileParameters;
                var thumbnail = (from s in _db.Sections where s.ID == sectionID select s).FirstOrDefault();
                var image = (from i in _db.Images where i.ID == imageID select i).FirstOrDefault();

                if (thumbnail != null)
                {
                    string testThumbnail = fileParams.Path + thumbnail.ThumbnailPath;
                    if (System.IO.File.Exists(testThumbnail) && delThumb
                        )
                    {
                        //deletes previous '_thumbnail' for current section
                        System.IO.File.Delete(fileParams.Path + thumbnail.ThumbnailPath);
                    }
                }           

                if (image != null)
                {
                    var imageName = image.ImagePath.Replace(fileParams.FileExtension, "");

                    if (System.IO.File.Exists(fileParams.Path + image.ImagePath) && delLargeImage)
                    {
                        //Delete previous 'Image' for current section
                        System.IO.File.Delete(fileParams.Path + image.ImagePath);
                    }

                    if (System.IO.File.Exists(fileParams.Path + imageName + "_cropped" + fileParams.FileExtension) && delCroppedImg)
                    {
                        //Delete previous '_cropped' image for current section
                        System.IO.File.Delete(fileParams.Path + imageName + "_cropped" + fileParams.FileExtension);
                    }
                }
            }
        }     

        /// <summary>
        /// Joins all thumbnails into one image
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        public static void CombineAllImages(int SectionID)
        {
            var _db = ImageRepository.Instance._db;
            var fileParams = ImageRepository.Instance.FileParameters;
            var images = (from img in _db.Images orderby img.Order where img.Section.ID == SectionID select img);

            String[] files = new String[images.Count()];
            string fullPath = "";

            if (images != null)
            {
                int counter = 0;
                foreach (var img in images)
                {
                    fullPath = fileParams.Path
                        + img.ImagePath.Replace(fileParams.FileExtension, "")
                        + "_cropped" + fileParams.FileExtension;

                    if (File.Exists(fullPath))
                    {
                        files[counter++] = fullPath;
                    }
                }

                //removing null values
                files = files.Where(x => !string.IsNullOrEmpty(x)).ToArray();

                if (files.Count() == 0)
                    return;

                //combine them into one image
                Bitmap stitchedImage = ImageRepository.Instance.Combine(files);

                if (stitchedImage == null)
                    return;

                //save the new image
                stitchedImage.Save(
                    fileParams.Path + fileParams.NoExtensionName + "_thumbnail" + fileParams.FileExtension,
                    System.Drawing.Imaging.ImageFormat.Jpeg);

            }
        }

        /// <summary>
        /// Resets the order, thats all..
        /// </summary>
        /// <param name="sectionID"></param>
        public static void ResetOrder(int sectionID)
        {
            ImageRepository.Instance.ResetImageOrder(sectionID);
        }
    }
}