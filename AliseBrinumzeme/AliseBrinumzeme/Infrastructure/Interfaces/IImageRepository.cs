using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AliseBrinumzeme.Models;

namespace AliseBrinumzeme.Infrastructure.Interfaces
{
    public interface IImageRepository
    {
        void SaveImage(string s, Bitmap b, long l);
        void InitializeFileParameters();
        void AddNewImage(HttpPostedFileBase file, Size size, long quality = 1000L, string filePath = "");
        void IncreasingOrder(int imageId);
        void DecreasingOrder(int imageId);
        String RandomFileName();
        Boolean CroppResize(Image image, int maxWidth, int maxHeight);
        Bitmap Combine(string[] files);
    }
}
