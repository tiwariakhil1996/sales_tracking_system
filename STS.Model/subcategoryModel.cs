using System;
using System.Collections.Generic;
using System.Text;
namespace STS.Model
{
    //Add
    public partial class SubcategoryModel
    {
        public int category_id { get; set; }
        public string subcategory { get; set; }
        public string status { get; set; }
      
       
    }
    //SubcategoryList
    public partial class SubcategoryListModel
    {
        public int ID { get; set; }
        public int category_id { get; set; }
        public string subcategory { get; set; }
        public string status { get; set; }
    }
}

