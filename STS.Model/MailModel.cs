using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    // Send Mail Model
    public partial class ResetPasswordModel
    {
        public string PrimaryDomain { get; set; }
        public string PrimaryPort { get; set; }
        public string UsernameEmail { get; set; }
        public string UsernamePassword { get; set; }
 
    }
}
    