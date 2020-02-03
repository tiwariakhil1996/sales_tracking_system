using System;
using System.Collections.Generic;
using System.Text;
namespace STS.Model
{
    //addProduct
    public partial class ProductModel
    {
        public string Cid    { get; set; }
        public string Sid { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public string Price       { get; set; }
        public string Image       { get; set; }
        public string ImageExtn { get; set; }
        public string Date        { get; set; }
    }
    //ProductList
    public partial class ProductListModel
    {
        public int ID { get; set; }
        public string Cid { get; set; }
        public string Sid { get; set; }
        public string Cname { get; set; }
        public string Sname { get; set; }
        public string Productname { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string Date { get; set; }
    }
}
