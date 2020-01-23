using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    //Register
    public partial class AdminRegisterModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Cpassword { get; set; }
        


    }

    //Login
    public partial class AdminLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }

    //Display
    //public partial class AdminLoginModel
    //{
    //    public int ID { get; set; }
    //    public string Username { get; set; }
    //    public string Email { get; set; }
    //    public string Password { get; set; }

    //}
}
