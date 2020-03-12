using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Common
{
    public class Constants
    {
        public static class Status
        {
            public static int Success { get { return 0; } }
            public static int Warning { get { return 1; } }
            public static int Error { get { return 2; } }
            public static int Info { get { return 3; } }
        }
        public enum UserRole
        {
            Admin = 0,
            Agent = 1,
            User = 2
        }
    }

    public class TranStatus
    {
        public string returnMessage { get; set; }
        public int code { get; set; }
        public string Token { get; set; }
        public int UserIdentity { get; set; }

        //public string Users { get; set; }
        public TranStatus()
        {
            returnMessage = "";
            code = 0;
            Token = "";
            UserIdentity = 0;
        }
    }
}
