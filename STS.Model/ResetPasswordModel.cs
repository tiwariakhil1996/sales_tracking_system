

namespace STS.Model
{
    //Reset Password Admin
    public partial class ResetPasswordAdminModel
    {
        public int UserId { get; set; }
        public string Newpassword { get; set; }
        public string Confirmpassword { get; set; }
        public string Token { get; set; }

    }

  
}
    