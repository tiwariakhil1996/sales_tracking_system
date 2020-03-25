using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
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
                parameter.Add("@UserName", model.UsernameEmail);// USerName means:tiwariakhil052@gmail.com

                parameter.Add("@Token", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                parameter.Add("@UserIdentity", dbType: DbType.Int32, direction: ParameterDirection.Output);//UserIdentity means:UserId
               

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("SendMail", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                if (transaction.code == 0)
                {
                    transaction.Token = parameter.Get<string>("@Token");
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

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("SendMail_Sales", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                if (transaction.code == 0)
                {
                    transaction.Token = parameter.Get<string>("@Token");
                    //transaction.Users = parameter.Get<string>("@Users");
                    transaction.UserIdentity = parameter.Get<int>("@UserIdentity");
                }
                return transaction;
            }
        }
       


    }
}