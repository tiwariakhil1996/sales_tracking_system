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
    public class ChatRepository : BaseRepository
    {
       
        TranStatus transaction = new TranStatus();

        public async Task<TranStatus> sendmessage(ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sender", model.SenderId);
                parameter.Add("@Receiver", model.ReceiverId);
                parameter.Add("@Msg", model.message);
                parameter.Add("@Createdby", model.SenderId);
                parameter.Add("@SenderType", model.SenderType);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("sendmessage", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        public List<ChatModel> getchats(ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sender", model.SenderId);
                parameter.Add("@Receiver", model.ReceiverId);
                parameter.Add("@Status", model.Status);
                parameter.Add("@Seen", model.Seen);

                //parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ChatModel>("getchats", parameter, commandType: CommandType.StoredProcedure);
                //RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }  
        
        
        public List<ChatModel> unread_messages(ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sender", model.SenderId);
                parameter.Add("@Receiver", model.ReceiverId);

                //parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ChatModel>("unread_messages", parameter, commandType: CommandType.StoredProcedure);
                //RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }


        //Delete
        public async Task<TranStatus> deleteMsg(int ID,ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", ID);
                parameter.Add("@Modifiedby", model.Modifiedby);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                //await connection.QueryMultipleAsync(nameof(deleteClient), parameter, commandType: CommandType.StoredProcedure);
                await connection.QueryAsync("deleteMsg", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

    }
}
