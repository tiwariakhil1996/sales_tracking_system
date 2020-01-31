using System;
using System.Collections.Generic;
using System.Text;
namespace STS.Model
{
    //AddCategory
    public partial class CategoryModel
    {
        public string category { get; set; }
        public string status { get; set; }


    }

    //CategoryList
    public partial class CategoryListModel
    {
        public int ID { get; set; }
        public string category { get; set; }
        public string status { get; set; }

    }
}