using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace AliseBrinumzeme.Infrastructure.Interfaces
{
    public interface IImageRepository
    {
        void RemoveOldImagesFromFolder(int id);

        void SaveImage(string s, Bitmap b, long l);

        void Edit(int id);

        void AddNewImage(HttpPostedFileBase file, Size size, long quality = 100L, string fileName = "");

        String RandomFileName(string name);

        Boolean CroppResize(Image image, int maxWidth, int maxHeight, string filePath);

        Bitmap Combine(string[] files);
    }
}
