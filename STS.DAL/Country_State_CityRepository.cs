using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using Dapper;
using STS.Common;
using STS.Model;

namespace STS.DAL
{
    public class Country_State_CityRepository : BaseRepository
    {


        //Display  Country
        public async Task<List<CountryModel>> CountryList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<CountryModel>("CountryList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //Display State
        public async Task<List<StateModel>> StateList(int cnid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", cnid);
                var result = await connection.QueryAsync<StateModel>("StateList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //Display City
        public async Task<List<CityModel>> CityList(int stid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sid", stid);
                var result = await connection.QueryAsync<CityModel>("CityList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }



    }
}
