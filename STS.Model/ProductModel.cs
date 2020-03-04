using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
     //addProduct
    public partial class ProductModel
    {
        public int Cid    { get; set; }
        public int Sid { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public int Price       { get; set; }
        //public string Image       { get; set; }
        //public string ImageExtn { get; set; }
        public string Date        { get; set; }
        public int Createdby { get; set; }


        public List<ImageList> ImageList { get; set; }
        public List<ImageModel> ImageListData { get; set; }


    }

    //Add multiple image
    public partial class ImageList
    {
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string ImageData { get; set; }
    }
    public partial class ImageModel
    {
        public string Image { get; set; }
    }

    public partial class Product_Image_ListModel
    {
        public int Id { get; set; }
        public string Image { get; set; }
    }

    public partial class ProductPriceModel
    {
        public int Id { get; set; }
        public string Price { get; set; }
       
    }


    //ProductList

    public partial class ProductListModel
    {
        public int ID { get; set; }
        public int Cid { get; set; }
        public int Sid { get; set; }
        public string Cname { get; set; }
        public string Sname { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string Date { get; set; }
        public bool IsActive { get; set; }
        public int Modifiedby { get; set; }

        public int userId { get; set; }

        public List<ImageList> ImageList { get; set; }
        public List<ImageModel> ImageListData { get; set; }

    }
}
