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
    public class SalesRepository : BaseRepository
    {
        TranStatus transaction = new TranStatus();


        // Register
        public async Task<TranStatus> RegisterSales(SalesModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))

            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
            
                parameter.Add("@SalesName", model.SalesName);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Password", model.Password);
                parameter.Add("@Cpassword", model.Cpassword);
                parameter.Add("@Createdby", model.Createdby);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("RegisterSales", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // SalesLogout
        //public async Task<TranStatus> SalesLogout(SalesModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))

        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
            
        //        parameter.Add("@Userid", model.Userid);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        await connection.QueryAsync("SalesLogout", parameter, commandType: CommandType.StoredProcedure);

        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}

       


        //Login
        public async Task<Tuple<List<SalesLoginModel>, TranStatus>> SalesLogin(SalesLoginModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                DynamicParameters parameter = new DynamicParameters();
                //parameter.Add("@ID", model.ID);
                //parameter.Add("@Image", model.Image);
                //parameter.Add("@SalesName", model.SalesName);
                //parameter.Add("@Gender", model.Gender);
                //parameter.Add("@Mobile", model.Mobile);
                //parameter.Add("@Adharcard", model.Adharcard);
                //parameter.Add("@Address", model.Address);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Password", model.Password);
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<SalesLoginModel>("SalesLogin", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return new Tuple<List<SalesLoginModel>, TranStatus>(result.ToList(), transaction);
            }
        }



        //UpdateSalesProfiel

        public async Task<Tuple<List<updateSalesModel>, TranStatus>> updateSalesProfile(updateSalesModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", model.ID);
                parameter.Add("@Image", model.Image);
                parameter.Add("@SalesName", model.SalesName);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Gender", model.Gender);
                parameter.Add("@Mobile", model.Mobile);
                parameter.Add("@Adharcard", model.Adharcard);
                parameter.Add("@Address", model.Address);
                parameter.Add("@Password", model.Password);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<updateSalesModel>("updateSalesProfile", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return new Tuple<List<updateSalesModel>, TranStatus>(result.ToList(), transaction);
            }
        }


        //Change Status Sales
        public async Task<TranStatus> ChangeStatusSales(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Id", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("ChangeStatusSales", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // SalesLogout

        public async Task<TranStatus> SalesLogout(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Userid", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("SalesLogout", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // Display Active Deactive Sales
        public async Task<List<SalesListModel>> SalesList_ActiveDeactive()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<SalesListModel>("SalesList_ActiveDeactive", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //Display
        public async Task<List<SalesListModel>> RegisteredSalesList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<SalesListModel>("RegisteredSalesList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //public async Task<List<SalesListModel>> RegisteredSalesList(SalesListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@AdminID", model.UserId);
        //        var result = await connection.QueryAsync<SalesListModel>("RegisteredSalesList", parameter, commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

        public List<SalesListModel>RegisteredSalesList(SalesListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
             
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.UserId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);
                parameter.Add("@Search", model.Search);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<SalesListModel>("RegisteredSalesList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();
         

            }
        }

        //Delete
        public async Task<TranStatus> deleteSales(int ID)
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
                await connection.QueryAsync("deleteSales", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }
        
        public async Task<TranStatus> deleteProfilepic(int ID)
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
                await connection.QueryAsync("deleteProfilepic", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Change Password
        public async Task<TranStatus> changesalesPassword(int Id, ChangepasswordModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SalesId", Id);
                parameter.Add("@OldPassword", model.Oldpassword);
                parameter.Add("@NewPassword", model.Newpassword);
                parameter.Add("@Confirmpassword", model.Confirmpassword);
             
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("changesalesPassword", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        public async Task<TranStatus> Refresh_Sales_Location(Refresh_Sales_Location_Model model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sales_ID", model.UserId);
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("Refresh_Sales_Location", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // Sales list in dropdown
        public async Task<List<SalesList_DropdownModel>> SalesList_dropdown(SalesList_DropdownModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.UserId);
                var result = await connection.QueryAsync<SalesList_DropdownModel>("SalesList_dropdown", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        public async Task<Tuple<List<ChatModel>, TranStatus>> getsaleschats(ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminId", model.AdminId);
                parameter.Add("@SalesId", model.SalesId);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<ChatModel>("getsaleschats", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return new Tuple<List<ChatModel>, TranStatus>(result.ToList(), transaction);
            }
        }      
        
        
        public async Task<Tuple<List<StatusModel>, TranStatus>> getadminstatus(StatusModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminId", model.AdminId);
                //parameter.Add("@SalesId", model.SalesId);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<StatusModel>("getadminstatus", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return new Tuple<List<StatusModel>, TranStatus>(result.ToList(), transaction);
            }
        }

    }
}
