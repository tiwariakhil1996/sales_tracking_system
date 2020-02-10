﻿using STS.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
    
    public partial class ActivityModel
    {
        public int ProductID { get; set; }
        public int SalesID { get; set; }
        public string ClientID { get; set; }
       
        public string Contact { get; set; }
       
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public string AppointmentDate { get; set; }
        public int Createdby { get; set; }

    }

    public partial class ActivityListModel
    {
        public int Aid { get; set; }
        public int ProductID { get; set; }
        public string Productname { get; set; }
      
        public int SalesID { get; set; }
        public string SalesName { get; set; }
        public string ClientID { get; set; }
        public string ClientName { get; set; }

        public string Contact { get; set; }


        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public string AppointmentDate { get; set; }
        public int Modifiedby { get; set; }

        public int userId { get; set; }
    }

    }
