using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
     //Register
    public partial class SalesModel
    {
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Cpassword { get; set; }
        


    }
    //Login
    public partial class SalesLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }


    //Display

    public partial class SalesListmodel
    {
        public int id { get; set; }
        public string salesname { get; set; }
        public string email { get; set; }
        public string password { get; set; }

    }
}
