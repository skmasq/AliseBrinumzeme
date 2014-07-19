using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web;

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
        public static string Image(HttpPostedFileBase file, int width, int height, int quality = 100, string fileName = "")
        {
            // Generate new filename and get extension
            if (string.IsNullOrEmpty(fileName)) fileName = DateTime.Now.ToString("ddMMyyyy") + DateTime.Now.Ticks.ToString();
            var fileExtension = Path.GetExtension(file.FileName);

            System.Drawing.Image img = System.Drawing.Image.FromStream(file.InputStream);
            System.Drawing.Image img2 = resizeImage(img, new Size(width, height));
            Bitmap b = new Bitmap(img2);
            img2.Dispose();
            saveJpeg(HttpContext.Current.Server.MapPath("~/content/u/") + fileName.ToLower() + fileExtension.ToLower(), b, quality);
            b.Dispose();

            return fileName.ToLower() + fileExtension.ToLower();
        }

        private static System.Drawing.Image resizeImage(System.Drawing.Image imgToResize, Size size)
        {
            int sourceWidth = imgToResize.Width;
            int sourceHeight = imgToResize.Height;

            float nPercent = 0;
            float nPercentW = 0;
            float nPercentH = 0;

            nPercentW = ((float)size.Width / (float)sourceWidth);
            nPercentH = ((float)size.Height / (float)sourceHeight);

            if (nPercentH < nPercentW)
                nPercent = nPercentH;
            else
                nPercent = nPercentW;

            int destWidth = (int)(sourceWidth * nPercent);
            int destHeight = (int)(sourceHeight * nPercent);

            Bitmap b = new Bitmap(destWidth, destHeight);
            Graphics g = Graphics.FromImage((System.Drawing.Image)b);
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;

            g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);
            g.Dispose();

            return (System.Drawing.Image)b;
        }

        private static void saveJpeg(string path, Bitmap img, long quality)
        {
            // Encoder parameter for image quality
            EncoderParameter qualityParam = new EncoderParameter(Encoder.Quality, quality);

            // Jpeg image codec
            ImageCodecInfo jpegCodec = getEncoderInfo("image/jpeg");

            if (jpegCodec == null)
                return;

            EncoderParameters encoderParams = new EncoderParameters(1);
            encoderParams.Param[0] = qualityParam;

            System.IO.MemoryStream mss = new System.IO.MemoryStream();
            System.IO.FileStream fs = new System.IO.FileStream(path, System.IO.FileMode.Create, System.IO.FileAccess.ReadWrite);

            img.Save(mss, jpegCodec, encoderParams);
            byte[] matriz = mss.ToArray();
            fs.Write(matriz, 0, matriz.Length);

            mss.Close();
            fs.Close();
        }

        private static ImageCodecInfo getEncoderInfo(string mimeType)
        {
            // Get image codecs for all image formats
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

            // Find the correct image codec
            for (int i = 0; i < codecs.Length; i++)
                if (codecs[i].MimeType == mimeType)
                    return codecs[i];
            return null;
        }

        public static void CropImage(Rectangle rectangle, string filePath)
        {
            Bitmap src = System.Drawing.Image.FromFile(HttpContext.Current.Server.MapPath("~/content/u/") + filePath) as Bitmap;
            Bitmap target = src.Clone(rectangle, src.PixelFormat);
            string ext = Path.GetExtension(filePath);
            string name = Path.GetFileNameWithoutExtension(filePath);
            saveJpeg(HttpContext.Current.Server.MapPath("~/content/u/") + name + "_cropped" + ext, target, 1000);
        }
    }
}