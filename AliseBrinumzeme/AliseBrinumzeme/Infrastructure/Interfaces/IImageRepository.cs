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
        void Edit(int id);
        void SaveImage(string s, Bitmap b, long l);
        void RemoveOldImagesFromFolder(int sectionID, int imageID, bool deleteThumbnail, bool deleteLargeImage, bool deleteCroppedImg);
        void AddNewImage(HttpPostedFileBase file, Size size, long quality = 1000L, string fileName = "");
        String RandomFileName(string name);
        Boolean CroppResize(Image image, int maxWidth, int maxHeight, string filePath);
        Bitmap Combine(string[] files);
    }
}
