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
    public class MailRepository : BaseRepository
    {

        TranStatus transaction = new TranStatus();

        //Send Mail
        public async Task<TranStatus> SendMail(SendMailModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserName", model.UsernameEmail);
                parameter.Add("@Token", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameter.Add("@UserIdentity", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameter.Add("@User", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("SendMail", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                if (transaction.code == 0)
                {
                    transaction.Token = parameter.Get<string>("@Token");
                    transaction.User = parameter.Get<string>("@User");
                    transaction.UserIdentity = parameter.Get<int>("@UserIdentity");
                }
                return transaction;
            }
        }  
        
        public async Task<TranStatus> SendMail_Sales(SendMailModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserName", model.UsernameEmail);
                parameter.Add("@Token", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameter.Add("@UserIdentity", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameter.Add("@User", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("SendMail_Sales", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                if (transaction.code == 0)
                {
                    transaction.Token = parameter.Get<string>("@Token");
                    transaction.User = parameter.Get<string>("@User");
                    transaction.UserIdentity = parameter.Get<int>("@UserIdentity");
                }
                return transaction;
            }
        }





    }
}