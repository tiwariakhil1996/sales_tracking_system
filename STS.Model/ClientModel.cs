
namespace STS.Model
{
    //addClient
    public partial class ClientModel
    {
        public string ClientName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Street { get; set; }

        public int Cid { get; set; }
        public int Sid { get; set; }
        public int Cityid { get; set; }
        public string PostalCode { get; set; }
        public int Createdby { get; set; }


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

        public string Cname { get; set; }

        public string Sname { get; set; }
        public string Cityname { get; set; }
        public string PostalCode { get; set; }

        public int Cid { get; set; }
        public int Sid { get; set; }
        public int Cityid { get; set; }
        public bool IsActive { get; set; }
        public int Modifiedby { get; set; }
        public int userId { get; set; }


        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int RowCount { get; set; }
        public string Search { get; set; }

    }
}
