﻿using System;
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
    public class UserRepository : BaseRepository
    {
        public async Task<TranStatus> RegisterUser(RegisterModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))

            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Username", model.Username);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Password", model.Password);
                parameter.Add("@Cpassword", model.Cpassword);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("RegisterUser", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        public async Task<List<RegisterListModel>> RegisterList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<RegisterListModel>("RegisterList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

    }
}
