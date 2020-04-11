using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STS.Models
{
    public class Message
    {
        public string clientuniqueid { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }



        public int senderId { get; set; }
        public int receiverId { get; set; }

    }
}

