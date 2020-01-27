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
        //Insert
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
                parameter.Add("@Country", model.Country);
                parameter.Add("@State", model.State);
                parameter.Add("@City", model.City);
                parameter.Add("@PostalCode", model.PostalCode);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("addClient", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Display
        public async Task<List<ClientListModel>> ClientList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ClientListModel>("ClientList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //Update
        public async Task<TranStatus> updateClient(int ID, ClientListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", ID);
                parameter.Add("@ClientName", model.ClientName);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Contact", model.Contact);
                parameter.Add("@Gender", model.Gender);
                parameter.Add("@Address", model.Address);
                parameter.Add("@Street", model.Street);
                parameter.Add("@Country", model.Country);
                parameter.Add("@State", model.State);
                parameter.Add("@City", model.City);
                parameter.Add("@PostalCode", model.PostalCode);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateClient", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        ////Update
        //public async Task<Tuple<TranStatus,List<ClientListModel>>> updateClient(int ID, ClientListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID", model.ID);
        //        parameter.Add("@ClientName", model.ClientName);
        //        parameter.Add("@Email", model.Email);
        //        parameter.Add("@Contact", model.Contact);
        //        parameter.Add("@Gender", model.Gender);
        //        parameter.Add("@Address", model.Address);
        //        parameter.Add("@Street", model.Street);
        //        parameter.Add("@Country", model.Country);
        //        parameter.Add("@State", model.State);
        //        parameter.Add("@City", model.City);
        //        parameter.Add("@PostalCode", model.PostalCode);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        IEnumerable<ClientListModel> clientList = await connection.QueryAsync<ClientListModel>("updateClient", parameter, commandType: CommandType.StoredProcedure);

        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return new Tuple<TranStatus, List<ClientListModel>>(transaction, clientList.ToList());
        //    }
        //}


        //Delete
        public async Task<TranStatus> deleteClient(int ID)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", ID);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                //await connection.QueryMultipleAsync(nameof(deleteClient), parameter, commandType: CommandType.StoredProcedure);
                await connection.QueryAsync("deleteClient", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


    }
}
