using System;
using System.Collections.Generic;
using System.Text;
namespace STS.Model
{
    //addProduct
    public partial class ProductModel
    {
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }
    }
    //ProductList
    public partial class ProductListModel
    {
        public int ID { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }
    }
}
