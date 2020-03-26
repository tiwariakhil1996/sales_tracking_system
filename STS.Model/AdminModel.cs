
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

    //public class EmailSettingsModel
    //{
    //    public string EmailTo { get; set; }
    //    public int Subject { get; set; }
    //    public string EmailMessage { get; set; }
     
    //    public string UsernamePassword { get; set; }
    //}
}
    