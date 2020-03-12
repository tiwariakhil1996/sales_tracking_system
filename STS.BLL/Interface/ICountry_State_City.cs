using STS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface ICountry_State_City
    {


        //Display Country
        Task<List<CountryModel>> CountryList();

        Task<List<StateModel>> StateList(int cid);

        Task<List<CityModel>> CityList(int sid);

    }
}

