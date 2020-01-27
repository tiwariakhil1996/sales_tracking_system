using STS.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
     //addProduct
    public partial class ClientModel
    {
        public string ClientName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

    }

    //Client List
    public partial class ClientListModel 
    {
        public int ID { get; set; }
        public string ClientName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }

    }
}
