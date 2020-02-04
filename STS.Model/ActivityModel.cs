using STS.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    
    public partial class ActivityModel
    {
        public int ProductID { get; set; }
        public int SalesID { get; set; }
        public int ClientID { get; set; }
       
        public int Contact { get; set; }
     
        public string Address { get; set; }
       
        public string LatLong { get; set; }

        public string AppointmentDate { get; set; }

    }

    public partial class ActivityListModel
    {
        public int Aid { get; set; }
        public string Productname { get; set; }
        public int ProductID { get; set; }
        public int SalesID { get; set; }
        public string SalesName { get; set; }
        public int ClientID { get; set; }
        public string ClientName { get; set; }

        public int contact { get; set; }

        public string Address { get; set; }

        public string LatLong { get; set; }

        public string AppointmentDate { get; set; }


    }
}
