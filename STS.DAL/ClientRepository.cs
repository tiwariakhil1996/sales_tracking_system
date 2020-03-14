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
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);
                parameter.Add("@Cid", model.Cid);
                parameter.Add("@Sid", model.Sid);
                parameter.Add("@Cityid", model.Cityid);
                parameter.Add("@PostalCode", model.PostalCode);
                parameter.Add("@Createdby", model.Createdby);
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


        //public async Task<List<ClientListModel>> each_admin_ClientList(ClientListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@AdminID", model.userId);
        //        var result = await connection.QueryAsync<ClientListModel>("each_admin_ClientList", parameter, commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}



        public List<ClientListModel> each_admin_ClientList(ClientListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
               
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.userId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);
                parameter.Add("@Search", model.Search);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ClientListModel>("each_admin_ClientList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }


        //public async Task<List<ClientListModel>> each_sales_ClientList(ClientListModel model)
        //    {
        //        using (var connection = new SqlConnection(ConnectionString))
        //        {
        //            connection.Open();
        //            TranStatus transaction = new TranStatus();
        //            DynamicParameters parameter = new DynamicParameters();
        //            parameter.Add("@SalesID", model.userId);
        //            var result = await connection.QueryAsync<ClientListModel>("each_sales_ClientList", parameter, commandType: CommandType.StoredProcedure);
        //            return result.ToList();

        //        }
        //    }

        public List<ClientListModel> each_sales_ClientList(ClientListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SalesID", model.userId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);
                parameter.Add("@Search", model.Search);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ClientListModel>("each_sales_ClientList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        } 
        
        
        public List<ClientListModel> each_user_ClientList(ClientListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserID", model.userId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ClientListModel>("each_user_ClientList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
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
                parameter.Add("@Cid", model.Cid);
                parameter.Add("@Sid", model.Sid);
                parameter.Add("@Cityid", model.Cityid);
                parameter.Add("@PostalCode", model.PostalCode);
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);
                parameter.Add("@Modifiedby", model.Modifiedby);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateClient", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

    

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


        //Change Status Client
        public async Task<TranStatus> ChangeStatusClient(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("ChangeStatusClient", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        // Display Active Deactive Client
        public async Task<List<ClientListModel>> ClientList_ActiveDeactive()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ClientListModel>("ClientList_ActiveDeactive", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }

        }
    }
}
