using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    // Send Mail Model
    public partial class SendMailModel
    {
        public string PrimaryDomain { get; set; }
        public string PrimaryPort { get; set; }
        public string UsernameEmail { get; set; }
        public string UsernamePassword { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }
        public string username { get; set; }

    }
}