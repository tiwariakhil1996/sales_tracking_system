using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    public partial class DemoRegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }

    }

    public partial class DemoLoginModel
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

    }
}
