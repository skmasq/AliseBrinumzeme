using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Linq;

namespace AliseBrinumzeme.Infrastructure
{
    public static class Upload
    {
        /// <summary>
        /// Is true if image 
        /// </summary>
        private static bool IsHorizontalImage = false;

        /// <summary>
        /// Uploads image to server
        /// </summary>
        /// <param name="file">Image file</param>
        /// <param name="height">Height to resize</param>
        /// <param name="width">Width to resize</param>
        /// <returns>Returns file name on success, null on failure</returns>
        public static string Image(HttpPostedFileBase file, int width, int height, int quality = 3000, string fileName = "")
        {
            if (string.IsNullOrEmpty(fileName))
            {
                fileName = DateTime.Now.ToString("ddMMyyyy") + DateTime.Now.Ticks.ToString();
            }

            var fileExtension = Path.GetExtension(file.FileName);
            var currentServerPath = HttpContext.Current.Server.MapPath("~/content/u/");

            System.Drawing.Image img = System.Drawing.Image.FromStream(file.InputStream);
            System.Drawing.Image img2 = resizeImage(img, new Size(111, 89));
            Bitmap b = new Bitmap(img2);
            img2.Dispose();

            string filePath = Path.Combine( currentServerPath, fileName + fileExtension.ToLower());
            
            saveJpeg(filePath, b, quality);
            CropImage(new Rectangle() { Width = 111, Height = 89 }, filePath);
            b.Dispose();

            JoinAllImagesToOne(currentServerPath, fileName);

            return fileName.ToLower() + fileExtension.ToLower();
        }

        /// <summary>
        /// Crops the image thumbnail
        /// </summary>
        /// <param name="rectangle"></param>
        /// <param name="filePath"></param>
        public static void CropImage(Rectangle rectangle, string filePath)
        {
            if (IsHorizontalImage)
            {
                rectangle.X = rectangle.Width / 4;
                rectangle.Y = 5;
            }
            else
            {
                rectangle.X = rectangle.Width / 4;
                rectangle.Y = rectangle.Height / 4;
            }

            Bitmap src = System.Drawing.Image.FromFile(filePath) as Bitmap;
            Bitmap target = src.Clone(rectangle, src.PixelFormat);
            string ext = Path.GetExtension(filePath);
            string name = Path.GetFileNameWithoutExtension(filePath);

            saveJpeg(
                path: HttpContext.Current.Server.MapPath("~/content/u/") + name + "_cropped" + ext,
                img:target,
                quality:100
                );
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="image"></param>
        /// <param name="maxWidth"></param>
        /// <param name="maxHeight"></param>
        /// <returns></returns>
        public static Bitmap ScaleImage(Image image, int maxWidth, int maxHeight)
        {
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);
            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);
            var newImage = new Bitmap(newWidth, newHeight);

            Graphics.FromImage(newImage).DrawImage(image, 0, 0, newWidth, newHeight);
            Bitmap bmp = new Bitmap(newImage);

            return bmp;
        }

        /// <summary>
        /// Joins all thumbnails into one image
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        private static Bitmap Combine(string[] files)
        {
            //read all images into memory
            List<System.Drawing.Bitmap> images = new List<System.Drawing.Bitmap>();
            System.Drawing.Bitmap finalImage = null;

            try
            {
                int width = 0;
                int height = 0;

                foreach (string image in files)
                {
                    //create a Bitmap from the file and add it to the list
                    System.Drawing.Bitmap bitmap = new System.Drawing.Bitmap(image);

                    //update the size of the final bitmap
                    width += bitmap.Width;
                    height = bitmap.Height > height ? bitmap.Height : height;

                    images.Add(bitmap);
                }

                //create a bitmap to hold the combined image
                finalImage = new System.Drawing.Bitmap(width, height);

                //get a graphics object from the image so we can draw on it
                using (System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(finalImage))
                {
                    //set background color
                    g.Clear(System.Drawing.Color.Black);

                    //go through each image and draw it on the final image
                    int offset = 0;
                    foreach (System.Drawing.Bitmap image in images)
                    {
                        g.DrawImage(image,
                          new System.Drawing.Rectangle(offset, 0, image.Width, image.Height));
                        offset += image.Width;
                    }
                }

                return finalImage;
            }
            catch (Exception ex)
            {
                if (finalImage != null)
                    finalImage.Dispose();

                throw ex;
            }
            finally
            {
                //clean up memory
                foreach (System.Drawing.Bitmap image in images)
                {
                    image.Dispose();
                }
            }
        }

        /// <summary>
        /// resize image so it will take less space
        /// </summary>
        /// <param name="imgToResize"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        private static Image resizeImage(Image imgToResize, Size size)
        {
            var bitmap = new Bitmap(imgToResize);

            if (imgToResize.Width > imgToResize.Height)
            {
                bitmap = ScaleImage(imgToResize, imgToResize.Width / 2, imgToResize.Height);
                IsHorizontalImage = true;
            }
            else
            {
                bitmap = ScaleImage(imgToResize, imgToResize.Width, imgToResize.Height / 2);
                IsHorizontalImage = false;
            }

            return (Image)bitmap;
        }

        /// <summary>
        /// Save image with specified quality
        /// </summary>
        /// <param name="path"></param>
        /// <param name="img"></param>
        /// <param name="quality"></param>
        private static void saveJpeg(string path, Bitmap img, long quality)
        {
            EncoderParameter qualityParam = new EncoderParameter(Encoder.Quality, 100L);
            ImageCodecInfo jpegCodec = getEncoderInfo("image/jpeg");

            if (jpegCodec == null) return;

            EncoderParameters encoderParams = new EncoderParameters(1);
            encoderParams.Param[0] = qualityParam;

            System.IO.MemoryStream mss = new System.IO.MemoryStream();
            System.IO.FileStream fs = new System.IO.FileStream(
                path, System.IO.FileMode.Create, System.IO.FileAccess.ReadWrite);

            img.Save(mss, jpegCodec, encoderParams);
            byte[] matriz = mss.ToArray();
            fs.Write(matriz, 0, matriz.Length);

            mss.Close();
            fs.Close();
        }

        /// <summary>
        /// Get image codecs for all image formats and finds the correct image codec
        /// </summary>
        /// <param name="mimeType"></param>
        /// <returns></returns>
        private static ImageCodecInfo getEncoderInfo(string mimeType)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

            for (int i = 0; i < codecs.Length; i++)
                if (codecs[i].MimeType == mimeType)
                    return codecs[i];
            return null;
        }

        /// <summary>
        /// Joins all thumbnails into one image, all images added horizontaly
        /// </summary>
        /// <param name="currentServerPath"></param>
        /// <param name="fileName"></param>
        private static void JoinAllImagesToOne(string currentServerPath, string fileName)
        {
            //get all the files in a directory
            String[] files = Directory.GetFiles(currentServerPath)
                .Where(x => x.Contains("_cropped")).ToArray();

            //combine them into one image
            System.Drawing.Bitmap stitchedImage = Combine(files);

            //save the new image
            stitchedImage.Save(
                currentServerPath + fileName + "_thumbnail.jpg",
                System.Drawing.Imaging.ImageFormat.Jpeg);
        }
    }
}