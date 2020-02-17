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
        public int ID { get; set; }
        public string Image { get; set; }
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Mobile { get; set; }
        public string Adharcard { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }

    }

    //Change Password
    public partial class ChangepasswordModel
    {
       //public int Id { get; set; }

        public string Oldpassword { get; set; }
        public string Newpassword { get; set; }
        public string Confirmpassword { get; set; }

    }

    public class updateSalesModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Mobile { get; set; }
        public string Adharcard { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }

    //Display

    public partial class SalesListModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Adharcard { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
       
    }
    public partial class ChangePasswordModel 
    {
        public int Id { get; set; }
        public string oldpassword { get; set; }
        public string newpassword { get; set; }
        public string confirmpassword { get; set; }

    }
}
