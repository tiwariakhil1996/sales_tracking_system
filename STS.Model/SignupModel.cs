using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    public partial class SignupModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Cpassword { get; set; }

    }
    public partial class SignupListModel
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
