using System;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using STS.Common;
using STS.Model;

namespace STS.DAL
{
    public class ResetPasswordRepository : BaseRepository
    {

        TranStatus transaction = new TranStatus();
        //Reset Password Admin
        public async Task<TranStatus> ResetPasswordAdmin(String Token, ResetPasswordAdminModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Token", Token);
                parameter.Add("@UserId", model.UserId);

                parameter.Add("@NewPassword", model.Newpassword);
                parameter.Add("@Confirmpassword", model.Confirmpassword);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("ResetPasswordAdmin", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }  
        
        
        
        public async Task<TranStatus> ResetPasswordSales(String Token, ResetPasswordAdminModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Token", Token);
                parameter.Add("@UserId", model.UserId);

                parameter.Add("@NewPassword", model.Newpassword);
                parameter.Add("@Confirmpassword", model.Confirmpassword);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("ResetPasswordSales", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }
    }
        
}
