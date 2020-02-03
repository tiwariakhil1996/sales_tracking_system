using System;
using System.Collections.Generic;
using System.Text;
namespace STS.Model
{
    //Add
    public partial class AddactivityModel
    {
      
        public int product_id{ get; set; }
        public int client_id { get; set; }
        public int sales_id { get; set; }
        public string lat_long { get; set; }
        public string appointment_date { get; set; }
    }
    //AddactivityList
    public partial class AddactivityListModel
    {

        public int product_id { get; set; }
        public int client_id { get; set; }
        public int sales_id { get; set; }
        public string lat_long { get; set; }
        public string appointment_date { get; set; }
    }
}

