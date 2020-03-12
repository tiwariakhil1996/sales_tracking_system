using STS.DAL;
using STS.Model;
using System.Collections.Generic;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class Country_State_CityServices : ICountry_State_City

    {
        Country_State_CityRepository countryRepository = null;


        //Display Country
        public async Task<List<CountryModel>> CountryList()
        {
            using (countryRepository = new Country_State_CityRepository())
            {
                return await countryRepository.CountryList();
            }
        }

        //Display State
        public async Task<List<StateModel>> StateList(int cnid)
        {
            using (countryRepository = new Country_State_CityRepository())
            {
                return await countryRepository.StateList(cnid);
            }
        }

        //Display City
        public async Task<List<CityModel>> CityList(int stid)
        {
            using (countryRepository = new Country_State_CityRepository())
            {
                return await countryRepository.CityList(stid);
            }
        }



    }
}
