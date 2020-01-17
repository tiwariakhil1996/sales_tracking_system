using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    public partial class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }

    }
    public partial class RegisterListModel
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

    }
}
