using STS.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    public partial class CountryModel
    {
        public int Cid { get; set; }
        public string Cname { get; set; }
    }
    public partial class StateModel
    {
        public int Sid { get; set; }
        public string Sname { get; set; }
        public int Cid { get; set; }

    }
    public partial class CityModel
    {

        public int Cityid { get; set; }
        public string Cityname { get; set; }
        public int Sid { get; set; }
    }

    public partial class CategoryModel
    {
        public string Cname { get; set; }

    }

    public partial class CategoryListModel
    {
        public int Cid { get; set; }
        public string Cname { get; set; }
        public bool IsActive { get; set; }



    }
    public partial class SubcategoryModel
    {

        public string Sname { get; set; }

        public int Cid { get; set; }
    }

    public partial class SubcategoryListModel
    {
        public int Cid { get; set; }
        public string Cname { get; set; }
        public int Sid { get; set; }
        public string Sname { get; set; }
       
    }
}
