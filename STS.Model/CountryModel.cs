using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{
  
    public partial class CountryModel
    {
        public int Cid { get; set; }
        public string Country { get; set; }

    }

    public partial class StateModel
    {
        public int Sid { get; set; }
        public string State { get; set; }
        public int Cid { get; set; }
        

    }

    public partial class CityModel
    {
        public int CityId { get; set; }
        public string City { get; set; }
        public int Sid { get; set; }

    }
}
