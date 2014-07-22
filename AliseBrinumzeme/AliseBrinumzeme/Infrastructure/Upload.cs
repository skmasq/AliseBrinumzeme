using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Linq;
using AliseBrinumzeme.Infrastructure.Repositories;

namespace AliseBrinumzeme.Infrastructure
{
    public static class Upload
    {
        /// <summary>
        /// Uploads image to server
        /// </summary>
        /// <param name="file">Image file</param>
        /// <param name="height">Height to resize</param>
        /// <param name="width">Width to resize</param>
        /// <returns>Returns file name on success, null on failure</returns>
        public static string Image(HttpPostedFileBase file, int width, int height, long quality, string fileName = "")
        {
            fileName = ImageRepository.Instance.RandomFileName(fileName);

            var fileParameters = ImageRepository.Instance.GetFileParameters(file,fileName);

            ImageRepository.Instance.AddNewImage(file, new Size(width, height),quality,fileParameters.FilePath);

            CombineAllImages(fileParameters.CurrentServerPath, fileName);

            return fileName + fileParameters.FileExtension;
        }

        /// <summary>
        /// Resize, cropp and save modified image
        /// </summary>
        /// <param name="image"></param>
        /// <param name="maxWidth"></param>
        /// <param name="maxHeight"></param>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static bool SaveCroppedImage(Image image, int maxWidth, int maxHeight, string fileName)
        {
            bool CroppingSuccess = ImageRepository.Instance.CroppResize(image, maxWidth, maxHeight, fileName);
            return CroppingSuccess;
        }  

        /// <summary>
        /// Joins all thumbnails into one image
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        private static void CombineAllImages(string currentServerPath, string fileName)
        {
            //get all the files in a directory
            String[] files = Directory.GetFiles(currentServerPath)
                .Where(x => x.Contains("_cropped")).ToArray();

            //combine them into one image
            Bitmap stitchedImage = ImageRepository.Instance.Combine(files);

            //save the new image
            stitchedImage.Save(
                currentServerPath + fileName + "_thumbnail.jpg",
                System.Drawing.Imaging.ImageFormat.Jpeg);
        }
    }
}