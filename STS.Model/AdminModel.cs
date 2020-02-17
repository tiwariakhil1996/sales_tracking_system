﻿using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    //Register
    public partial class AdminRegisterModel
    {
        public string Image { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public string Cpassword { get; set; }
        


    }

    //Login
    public partial class AdminLoginModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }

    }


    //Update Profile
    public class updateProfileModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
    }

    //Display
    //public partial class AdminLoginModel
    //{
    //    public int ID { get; set; }
    //    public string Username { get; set; }
    //    public string Email { get; set; }
    //    public string Password { get; set; }

    //}
    public partial class ChangeAdminPasswordModel
    {
        public int id { get; set; }
        public string oldpassword { get; set; }
        public string newpassword { get; set; }
        public string confirmpassword { get; set; }

    }
}
