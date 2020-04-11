using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{


    public partial class ChatModel
    {
        public int ID { get; set; }
        public int AdminId { get; set; }
        public int SalesId { get; set; }
        public string Msg { get; set; }
        public string Createdon { get; set; }
        public int Createdby { get; set; }
        public int Modifiedby { get; set; }
        public string Adminname { get; set; }
        public string Salesname { get; set; }
        public string Createddate { get; set; }
        public string Createdtime { get; set; }

        public bool Isonline { get; set; }


        public int SenderId { get; set; }
        public int SenderType { get; set; }
        public int ReceiverId { get; set; }
        public string clientuniqueid { get; set; }
        public string type { get; set; }
        public int Status { get; set; }
        public int Seen { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }

    public partial class StatusModel
    {
        public int AdminId { get; set; }

        public bool Isonline { get; set; }

    }

}
