﻿
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
        public int Createdby { get; set; }
        


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

        public string Companyname { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public int UserType { get; set; }

        public int Createdby { get; set; }

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
        public string Password { get; set; }
        public string Companyname { get; set; }
        public string Address { get; set; }

        public int Createdby { get; set; }

        public int UserType { get; set; }
    }


    //Change Password
    public partial class Changeadmin_passwordModel
    {
        public int Id { get; set; }
        public string Oldpassword { get; set; }
        public string Newpassword { get; set; }
        public string Confirmpassword { get; set; }

    } 
    
    
    public partial class ChatModel
    {
        public int AdminId { get; set; }
        public string SalesId { get; set; }
        public string Msg { get; set; }
        public string Createdon { get; set; }
        public int Createdby { get; set; }
        public string Adminname { get; set; }
        public string Salesname { get; set; }
        public string Createddate { get; set; }
        public string Createdtime { get; set; }

    }


    
}
    