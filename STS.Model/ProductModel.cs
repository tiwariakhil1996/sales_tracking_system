using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
     //addProduct
    public partial class ProductModel
    {
        public string Category    { get; set; }
        public string SubCategory { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string    Price       { get; set; }
        public string Image       { get; set; }
        public string Date        { get; set; }



    }
    public partial class ProductDetailsModel
    {
        public int ID { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }


    }


}
