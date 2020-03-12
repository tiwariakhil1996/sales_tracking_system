namespace STS.Model
{
    public partial class CountryModel
    {
        public int Cid { get; set; }
        public string Cname { get; set; }
    }
    public partial class StateModel
    {
        public int Sid { get; set; }
        public string Sname { get; set; }
        public int Cid { get; set; }

    }



    public partial class CityModel
    {

        public int Cityid { get; set; }
        public string Cityname { get; set; }
        public int Sid { get; set; }
    }

}
