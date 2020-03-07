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
    public class ResetPasswordRepository : BaseRepository
    {

        TranStatus transaction = new TranStatus();
        //Reset Password Admin
        public async Task<TranStatus> ResetPasswordAdmin(int ResetPassword_id, ResetPasswordAdminModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ResetPassword_id", ResetPassword_id);
                //parameter.Add("@OldPassword", model.Oldpassword);
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
    }
        
}
