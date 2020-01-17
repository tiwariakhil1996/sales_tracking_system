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
    public class SignupRepository : BaseRepository
    {
        public async Task<TranStatus> ProSignup(SignupModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))

            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserName", model.Username);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Password", model.Password);
                parameter.Add("@Cpassword", model.Cpassword);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("ProSignup", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        public async Task<List<SignupListModel>> ProLogin()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<SignupListModel>("ProLogin", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

    }
}
