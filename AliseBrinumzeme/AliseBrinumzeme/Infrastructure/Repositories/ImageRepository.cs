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
using AliseBrinumzeme.Models.Properties;

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
        public void AddNewImage(HttpPostedFileBase file, Size size, long quality = 100L, string filePath = "")
        {
            //Create full screen image
            using (Image fullScreenImage = FitImage(System.Drawing.Image.FromStream(file.InputStream), 1100, 700))
            {
                SaveImageByType(fullScreenImage, FileParameters.Path, FileParameters.Name, 100L, ImageType.FullScreenImage);
            }
            //Create large image
            using (Image img = FitImage(System.Drawing.Image.FromStream(file.InputStream), 260, 360))
            {
                SaveImageByType(img, FileParameters.Path, FileParameters.Name, quality, ImageType.LargeImage);
            }
            //Create cropped image
            using (Image imgCropped = FitImage(System.Drawing.Image.FromStream(file.InputStream), 111, 89))
            {
            SaveImageByType(imgCropped, FileParameters.Path, FileParameters.Name, 60, ImageType.Thumbnail);
            }
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
        /// Resize image to specified 'maxWidth' and 'maxHeight'
        /// </summary>
        /// <param name="image"></param>
        /// <param name="maxWidth"></param>
        /// <param name="maxHeight"></param>
        /// <returns></returns>
        public Image FitImage(Image image, int maxWidth, int maxHeight)
        {
            Image finalImage = image;

            // Get the image's original width and height
            int originalWidth = image.Width;
            int originalHeight = image.Height;

            // To preserve the aspect ratio
            float ratioX = (float)maxWidth / (float)originalWidth;
            float ratioY = (float)maxHeight / (float)originalHeight;
            float ratio = Math.Min(ratioX, ratioY);

            // New width and height based on aspect ratio
            int newWidth = (int)(originalWidth * ratio);
            int newHeight = (int)(originalHeight * ratio);

            finalImage = ResizeImage(image, newWidth, newHeight);

            return finalImage;
        }

        public Image ResizeImage(Image image, int width, int height)
        {
            // Convert other formats (including CMYK) to RGB.
            Bitmap newImage = new Bitmap(width, height, PixelFormat.Format24bppRgb);

            // Draws the image in the specified size with quality mode set to HighQuality
            using (Graphics graphics = Graphics.FromImage(newImage))
            {
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.DrawImage(image, 0, 0, width, height);
            }

            return newImage;
        }

        /// <summary>
        /// Cropps the image
        /// </summary>
        /// <param name="image"></param>
        /// <param name="maxWidth"></param>
        /// <param name="maxHeight"></param>
        /// <returns></returns>
        public Image CroppImage(Image image, int maxWidth, int maxHeight)
        {
            Image finalImage = image;
            System.Drawing.Bitmap bitmap = new System.Drawing.Bitmap(maxWidth, maxHeight);

            int left = 0, top = 0, srcWidth = maxWidth, srcHeight = maxHeight;
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
                g.DrawImage(image,
                    new Rectangle(0, 0, bitmap.Width, bitmap.Height),
                    new Rectangle(left, top, srcWidth, srcHeight),
                    GraphicsUnit.Pixel);
            }

            finalImage = bitmap;

            //when dispose bitmap it trows an axception..
            //bitmap.Dispose();

            return finalImage;
        }

        /// <summary>
        /// Saves image with specified parameters
        /// </summary>
        /// <param name="image"></param>
        /// <param name="filePath"></param>
        /// <param name="imageName"></param>
        /// <param name="imageQuality"></param>
        /// <param name="isLargeImage"></param>
        /// <returns></returns>
        public bool SaveImageByType(Image image, string filePath, string imageName, long imageQuality = 100L, 
            ImageType imageType = ImageType.LargeImage)
        {
            string imageType1 = "_cropped";
            string imageType2 = "_thumbnail";
            string imageType3 = "_fullscreen";
            string fileExtension = Path.GetExtension(imageName);
            string noExtensionName = Path.GetFileNameWithoutExtension(imageName);
            string fullPath = "";
            var stringB = new System.Text.StringBuilder();

            try
            {
                using (EncoderParameters encParams = new EncoderParameters(1))
                {
                    encParams.Param[0] = new EncoderParameter(Encoder.Quality, imageQuality);

                    switch(imageType)
                    {
                        case ImageType.FullScreenImage:
                            fullPath = stringB
                                .Append(filePath)
                                .Append(noExtensionName)
                                .Append(imageType3)
                                .Append(fileExtension).ToString();
                            break;
                        case ImageType.LargeImage:
                             fullPath = stringB.Append(filePath).Append(imageName).ToString();
                            break;

                        case ImageType.Thumbnail: 
                            fullPath = stringB
                                .Append(filePath)
                                .Append(noExtensionName)
                                .Append(imageType1)
                                .Append(fileExtension).ToString();
                            break;

                        case ImageType.JoinedThumbnails:
                            fullPath = stringB
                                .Append(filePath)
                                .Append(noExtensionName)
                                .Append(imageType2)
                                .Append(fileExtension).ToString();
                            break;

                        default: break;
                    }

                    SaveImage(path: fullPath, img: image as Bitmap, quality: imageQuality);
                    stringB.Clear();
                    return true;
                }
            }
            catch
            {
            }
            return false;
        }

        /// <summary>
        /// Saves the image to the folder
        /// </summary>
        /// <param name="path"></param>
        /// <param name="img"></param>
        /// <param name="quality"></param>
        public void SaveImage(string path, Bitmap img, long quality)
        {
            EncoderParameter qualityParam = new EncoderParameter(Encoder.Quality, quality);
            ImageCodecInfo jpegCodec = getEncoderInfo("image/jpeg");

            if (jpegCodec == null) 
                return;

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

        public void ChangeOrder(int id, bool increaseOrder)
        {
            var image = (from img in _db.Images where img.ID == id select img).FirstOrDefault();
            var imagesList = _db.Images.OrderBy(x => x.Order).Where(x => x.SectionID == image.SectionID).ToList();

            if(increaseOrder)
            {
                if (imagesList.Count() > 1 && image.Order < imagesList.Count())
                {
                    for (int i = 0; i < imagesList.Count(); i++)
                    {
                        if (imagesList[i].ID == image.ID && i < imagesList.Count() - 1)
                        {
                            imagesList[i].Order = imagesList[i].Order + 1;
                            imagesList[i + 1].Order = imagesList[i + 1].Order - 1;
                        }
                    }
                }
            }
            else
            {
                if (imagesList.Count() > 1 && image.Order > 1)
                {
                    for (int i = 0; i < imagesList.Count(); i++)
                    {
                        if (imagesList[i].ID == image.ID && i > 0)
                        {
                            imagesList[i].Order = imagesList[i].Order - 1;
                            imagesList[i - 1].Order = imagesList[i - 1].Order + 1;
                        }
                    }
                }
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