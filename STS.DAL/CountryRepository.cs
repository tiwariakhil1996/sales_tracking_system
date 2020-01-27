using System;
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
    public class CountryRepository : BaseRepository
    {
 
        //Display
        public async Task<List<CountryModel>> CountryList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<CountryModel>("CountryList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

    }
}
