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
    public class ClientRepository : BaseRepository
    {
        public async Task<TranStatus> addClient(ClientModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ClientName", model.ClientName);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Contact", model.Contact);
                parameter.Add("@Gender", model.Gender);
                parameter.Add("@Address", model.Address);
                parameter.Add("@Street", model.Street);
                parameter.Add("@City", model.City);
                parameter.Add("@PostalCode", model.PostalCode);
                parameter.Add("@Country", model.Country);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("addClient", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        public async Task<List<ClientListModel>> ClientList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ClientListModel>("ClientList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

    }
}
