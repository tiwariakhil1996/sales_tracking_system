using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using System.IO;
using System.Data;
using System.Reflection;

namespace STS.Common
{
    public static class CommonHelper
    {
        public static TranStatus TransactionErrorHandler(Exception ex)
        {

            TranStatus transaction = new TranStatus();
            if (ex.Message.Contains("||"))
            {
                transaction.code = Convert.ToInt32(ex.Message.Split("||")[0]);
                transaction.returnMessage = ex.Message.Split("||")[1];
            }
            else
            {
                transaction.code = Constants.Status.Error;
                transaction.returnMessage = ex.Message;
            }
            return transaction;
        }

        public static DataTable ToDataTable<T>(this IList<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties by using reflection
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names

                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }

        public static string SaveImage(dynamic HttpContext, string PathToSaveImage, string base64imageString, bool createThumb, string extn, int isOriginalSave = 0, bool isBanner = false)
        {
            try
            {
                if (base64imageString != null)
                {

                    //Path where want to save image 

                    string imageDirectory = "Document/" + PathToSaveImage + "/";

                    if (!Directory.Exists(imageDirectory))
                    {
                        Directory.CreateDirectory(imageDirectory);
                    }
                    if (extn == "")
                    {
                        extn = ".jpg";
                    }
                    string fileName = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff") + extn;

                    string filePath = imageDirectory + fileName;

                    var bytes = Convert.FromBase64String(base64imageString);
                    //convert byte to image
                    using (MemoryStream ms = new MemoryStream(bytes))
                    {
                        var bmp = new Bitmap(ms);
                        if (isOriginalSave == 0)
                        {
                            ImageHandler.Save(bmp, 640, 480, 100, filePath, extn);
                        }
                        else if (isBanner)
                        {
                            ImageHandler.Save(bmp, 1680, 600, 100, filePath, extn);// Default Image size for banner
                        }
                        else if (isOriginalSave == 2)
                        {
                            if (bmp.Width > 640 || bmp.Height > 480)
                            {
                                ImageHandler.Save(bmp, 640, 480, 100, filePath, extn);
                            }
                            else
                            {
                                ImageHandler.Save(bmp, bmp.Width, bmp.Height, 100, filePath, extn);
                            }
                        }
                        else
                        {
                            ImageHandler.Save(bmp, bmp.Width, bmp.Height, 100, filePath, extn);
                        }
                        if (createThumb)
                        {
                            imageDirectory = imageDirectory + "Thumb\\";
                            if (!Directory.Exists(imageDirectory))
                            {
                                Directory.CreateDirectory(imageDirectory);
                            }
                            filePath = imageDirectory + fileName;
                            ImageHandler.Save(bmp, 75, 75, 50, filePath, extn);
                        }
                    }
                    //Resize and save thumb Image
                    return fileName;
                }
            }
            catch (Exception ex)
            {
            }
            return null;


        }

       
    }
}
