﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AliseBrinumzeme.Infrastructure.Interfaces;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace AliseBrinumzeme.Infrastructure.Repositories
{
    public class ImageRepository : IImageRepository
    {
        //Singleton
        private static ImageRepository _imageRepository;

        public static ImageRepository Instance
        {
            get 
            {
                if (_imageRepository == null)
                {
                    return _imageRepository = new ImageRepository();
                }
                return _imageRepository;
            }
        }

        public void RemoveOldImagesFromFolder(int id)
        {

        }

        public void Edit(int id)
        {       

        }

        public FileParameters GetFileParameters(HttpPostedFileBase file, string fileName = "")
        {
            string fExtension = Path.GetExtension(file.FileName);
            string curServerPath = HttpContext.Current.Server.MapPath("~/content/u/");
            string fPath = Path.Combine(curServerPath, fileName + fExtension.ToLower());

            var fileParameters = new FileParameters()
            {
                FileExtension = fExtension,
                CurrentServerPath = curServerPath,
                FilePath = fPath
            };

            return fileParameters;
        }

        public void AddNewImage(HttpPostedFileBase file, Size size, long quality = 100L, string filePath = "")
        {
            Image img = System.Drawing.Image.FromStream(file.InputStream);
            Bitmap b = new Bitmap(img);

            CroppResize(img, size.Width = 111, size.Height = 89, filePath);

            img.Dispose();
            SaveImage(filePath, b, quality);
        }

        public String RandomFileName(string name)
        {
            if (String.IsNullOrEmpty(name))
            {
                name = DateTime.Now.ToString("ddMMyyyy") + DateTime.Now.Ticks.ToString();
            }
            return name;
        }

        public Boolean CroppResize(Image image, int maxWidth, int maxHeight, string filePath)
        {
            ImageCodecInfo jpgInfo = ImageCodecInfo.GetImageEncoders()
                                     .Where(codecInfo =>
                                     codecInfo.MimeType == "image/jpeg").First();

            string ext = Path.GetExtension(filePath);
            string name = Path.GetFileNameWithoutExtension(filePath);

            Image finalImage = image;
            System.Drawing.Bitmap bitmap = null;
            try
            {
                int left = 0, top = 0,
                    srcWidth = maxWidth,
                    srcHeight = maxHeight;

                bitmap = new System.Drawing.Bitmap(maxWidth, maxHeight);
                double croppedHeightToWidth = (double)maxHeight / maxWidth;
                double croppedWidthToHeight = (double)maxWidth / maxHeight;

                if (image.Width > image.Height)
                {
                    srcWidth = (int)(Math.Round(image.Height * croppedWidthToHeight));
                    if (srcWidth < image.Width)
                    {
                        srcHeight = image.Height;
                        left = (image.Width - srcWidth) / 2;
                    }
                    else
                    {
                        srcHeight = (int)Math.Round(image.Height * ((double)image.Width / srcWidth));
                        srcWidth = image.Width;
                        top = (image.Height - srcHeight) / 2;
                    }
                }
                else
                {
                    srcHeight = (int)(Math.Round(image.Width * croppedHeightToWidth));
                    if (srcHeight < image.Height)
                    {
                        srcWidth = image.Width;
                        top = (image.Height - srcHeight) / 2;
                    }
                    else
                    {
                        srcWidth = (int)Math.Round(image.Width * ((double)image.Height / srcHeight));
                        srcHeight = image.Height;
                        left = (image.Width - srcWidth) / 2;
                    }
                }
                using (Graphics g = Graphics.FromImage(bitmap))
                {
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    g.CompositingQuality = CompositingQuality.HighQuality;
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.DrawImage(image, new Rectangle(0, 0, bitmap.Width, bitmap.Height),
                    new Rectangle(left, top, srcWidth, srcHeight), GraphicsUnit.Pixel);
                }
                finalImage = bitmap;
            }
            catch { }
            try
            {
                using (EncoderParameters encParams = new EncoderParameters(1))
                {
                    encParams.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);
                    SaveImage(
                        path: HttpContext.Current.Server.MapPath("~/content/u/") + name + "_cropped" + ext,
                        img: finalImage as Bitmap,
                        quality: 1000
                    );
                    return true;
                }
            }
            catch { }
            if (bitmap != null)
            {
                bitmap.Dispose();
            }
            return false;
        }

        public Bitmap Combine(string[] files)
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

        public void SaveImage(string path, Bitmap img, long quality)
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

        private static ImageCodecInfo getEncoderInfo(string mimeType)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

            for (int i = 0; i < codecs.Length; i++)
                if (codecs[i].MimeType == mimeType)
                    return codecs[i];
            return null;
        }

    }

    public struct FileParameters
    {
        public string FileExtension { get; set; }
        public string CurrentServerPath { get; set; }
        public string FilePath { get; set; }
    }
}