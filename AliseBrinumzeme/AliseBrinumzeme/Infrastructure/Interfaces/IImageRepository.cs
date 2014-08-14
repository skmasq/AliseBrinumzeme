namespace AliseBrinumzeme.Infrastructure.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using AliseBrinumzeme.Models;
    using AliseBrinumzeme.Models.Properties;

    public interface IImageRepository
    {
        void InitializeFileParameters();
        void ChangeOrder(int id, bool increaseOrder);
        String RandomFileName();
        void AddNewImage(HttpPostedFileBase file, Size size, long quality = 100L, string filePath = "");
        Image FitImage(Image image, int maxWidth, int maxHeight);
        Image CroppImage(Image image, int maxWidth, int maxHeight);
        bool SaveImageByType(Image image, string filePath, string imageName, long imageQuality = 100, ImageType imageType = ImageType.LargeImage);
        void SaveImage(string s, Bitmap b, long l);
        Bitmap Combine(string[] files);
    }
}
