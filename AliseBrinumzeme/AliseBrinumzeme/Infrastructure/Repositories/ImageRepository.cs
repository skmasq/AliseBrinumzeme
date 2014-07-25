using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AliseBrinumzeme.Infrastructure.Interfaces;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using AliseBrinumzeme.Models;

namespace AliseBrinumzeme.Infrastructure.Repositories
{
    /// <summary>
    /// Responsible for image operations like saving, creating, deleting etc.
    /// </summary>
    public class ImageRepository : IImageRepository
    {
        public MainDataContext _db = new MainDataContext();

        private FileParameters _getFileParameters;
        public FileParameters FileParameters
        {
            get { return _getFileParameters; }
            set { _getFileParameters = value; }
        }

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
        
        /// <summary>
        /// Initializes base file parameters like- generating random file name, getting file path etc.
        /// </summary>
        /// <param name="file"></param>
        public void InitializeFileParameters()
        {
            string randomfileName = RandomFileName();
            string fExtension = ".jpg";
            string path = HttpContext.Current.Server.MapPath("~/content/u/");
            string noExtName = randomfileName.Replace(fExtension, "");
            string fullPath = Path.Combine(path, noExtName + fExtension);
           
            _getFileParameters = new FileParameters
            {
                FileExtension = fExtension,
                Name = randomfileName + fExtension,         
                FullPath = fullPath,
                Path = path,
                NoExtensionName = noExtName
            };
        }

        /// <summary>
        /// Addming image to the folder
        /// </summary>
        /// <param name="file"></param>
        /// <param name="size"></param>
        /// <param name="quality"></param>
        /// <param name="filePath"></param>
        public void AddNewImage(HttpPostedFileBase file, Size size, long quality = 1000L, string filePath = "")
        {
            //Gets the uploaded image
            Image img = System.Drawing.Image.FromStream(file.InputStream);
            //Creating bitmap from image
            Bitmap b = new Bitmap(img);
            //Cropps and resizes the image
            CroppResize(img, size.Width = 111, size.Height = 89);
            //disposing the image
            img.Dispose();
            //save image to folder
            SaveImage(filePath, b, quality);
        }

        /// <summary>
        /// Generates random name
        /// </summary>
        /// <returns></returns>
        public String RandomFileName()
        {
            return DateTime.Now.ToString("ddMMyyyy") + DateTime.Now.Ticks.ToString();
        }

        /// <summary>
        /// Crops and resizes the specified image
        /// </summary>
        /// <param name="image"></param>
        /// <param name="maxWidth"></param>
        /// <param name="maxHeight"></param>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public Boolean CroppResize(Image image, int maxWidth, int maxHeight)
        {
            ImageCodecInfo jpgInfo = ImageCodecInfo.GetImageEncoders()
                                     .Where(codecInfo =>
                                     codecInfo.MimeType == "image/jpeg").First();

            Image finalImage = image;
            System.Drawing.Bitmap bitmap = null;

            try
            {
                int left = 0, top = 0, srcWidth = maxWidth, srcHeight = maxHeight;
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
            catch 
            { }

            try
            {
                using (EncoderParameters encParams = new EncoderParameters(1))
                {
                    encParams.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);

                    SaveImage(
                        path: FileParameters.Path + FileParameters.NoExtensionName + "_cropped" + FileParameters.FileExtension,
                        img: finalImage as Bitmap,
                        quality: 1000
                    );

                    SaveImage(
                        path: FileParameters.Path + FileParameters.Name,
                        img: image as Bitmap,
                        quality: 1000
                    );

                    return true;
                }
            }
            catch 
            { }

            if (bitmap != null)
            {
                bitmap.Dispose();
            }
            return false;
        }

        /// <summary>
        /// Combine all specified images togeather horizontaly
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Saves the image to the folder
        /// </summary>
        /// <param name="path"></param>
        /// <param name="img"></param>
        /// <param name="quality"></param>
        public void SaveImage(string path, Bitmap img, long quality)
        {
            EncoderParameter qualityParam = new EncoderParameter(Encoder.Quality, 1000L);
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
        /// Increasing image order nr. for specified section
        /// </summary>
        /// <param name="imageId"></param>
        public void IncreasingOrder(int id)
        {
            var image = (from img in _db.Images where img.ID == id select img).FirstOrDefault();
            var imagesList = _db.Images.OrderBy(x => x.Order).Where(x => x.SectionID == image.SectionID).ToList();

            if (imagesList.Count() > 1 && image.Order != imagesList.Count())
            {
                for (int i = 0; i < imagesList.Count(); i++)
                {
                    if (imagesList[i].ID == image.ID)
                    {
                        imagesList[i].Order = imagesList[i].Order + 1;
                        imagesList[i + 1].Order = imagesList[i + 1].Order - 1;
                    }
                }
            }
            _db.SaveChanges();
        }

        /// <summary>
        /// Decreasing image order nr. for specified section
        /// </summary>
        /// <param name="imageId"></param>
        public void DecreasingOrder(int id)
        {
            var image = (from img in _db.Images where img.ID == id select img).FirstOrDefault();
            var imagesList = _db.Images.OrderBy(x => x.Order).Where(x => x.SectionID == image.SectionID).ToList();

            if (imagesList.Count() > 1 && image.Order != 1)
            {
                for (int i = 0; i < imagesList.Count(); i++)
                {
                    if (imagesList[i].ID == image.ID)
                    {
                        imagesList[i].Order = imagesList[i].Order - 1;
                        imagesList[i - 1].Order = imagesList[i - 1].Order + 1;
                    }
                }
            }
            _db.SaveChanges();
        }

        /// <summary>
        /// Resets the Order nr. so each value would differ from other by 1
        /// </summary>
        /// <param name="sectionId"></param>
        public void ResetImageOrder(int sectionId)
        {
            var imagesList = _db.Images.OrderBy(x => x.Order).Where(x => x.SectionID == sectionId).ToList();

            for (int i = 0; i < imagesList.Count(); i++)
            {
                imagesList[i].Order = i + 1;
            }

            _db.SaveChanges();
        }

        /// <summary>
        /// Well no idea what this method is doing, just use it
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
    }

    /// <summary>
    /// Class that just holds basic file information like path, name etc.
    /// </summary>
    public class FileParameters
    {
        public string FileExtension { get; set; }
        public string FullPath { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public string NoExtensionName { get; set; }
    }
}