using STS.Common;
using STS.DAL;
using STS.Model;
using System;
using System.Collections.Generic;
using System.Text;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class CountryServices : ICountry

    {
       // Display
        public async Task<List<CountryModel>> CountryList()
        {
            using (countryRepository = new CountryRepository())
            {
                return await countryRepository.CountryList();
            }
        }
    }
}
