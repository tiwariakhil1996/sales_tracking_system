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
    public class ActivityRepository : BaseRepository
    {


        //Insert
        public async Task<TranStatus> addActivity(ActivityModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Title", model.Title);
                parameter.Add("@Description", model.Description);
                parameter.Add("@ProductID", model.ProductID);
                parameter.Add("@Price", model.Price);
                parameter.Add("@Quantity", model.Quantity);
                parameter.Add("@Amount", model.Amount);
                parameter.Add("@Discount_per", model.Discount_per);
                parameter.Add("@Discount_amt", model.Discount_amt);
                parameter.Add("@Total_price", model.Total_price);
                parameter.Add("@SalesID", model.SalesID);
                parameter.Add("@ClientID", model.ClientID);
                parameter.Add("@Contact", model.Contact);

                parameter.Add("@AppointmentDate", model.AppointmentDate);
                parameter.Add("@Createdby", model.Createdby);

                parameter.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("addActivity", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }



        


        //Display
        public async Task<List<ActivityListModel>> ActivityList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ActivityListModel>("ActivityList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //Display ActivityList_while_adding
        public async Task<List<ActivityList_while_addingModel>> ActivityList_while_adding()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ActivityList_while_addingModel>("ActivityList_while_adding", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }



        // Display each sales List Individually
        public async Task<List<ActivityListModel>> each_sales_activityList(ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SalesID", model.userId);

                var result = await connection.QueryAsync<ActivityListModel>("each_sales_activityList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        // Display each admin List Individually
        public async Task<List<admin_ActivityListModel>> each_admin_activityList(admin_ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.userId);

                var result = await connection.QueryAsync<admin_ActivityListModel>("each_admin_activityList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }


        }
        // Count Assigned list on bell  notification 
        public async Task<List<newNotificationActivityLisModel>> assigned_activityList(newNotificationActivityLisModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SalesID", model.userId);

                var result = await connection.QueryAsync<newNotificationActivityLisModel>("assigned_activityList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }



        //Delete
        public async Task<TranStatus> deleteActivity(int Aid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                //await connection.QueryMultipleAsync(nameof(deleteClient), parameter, commandType: CommandType.StoredProcedure);
                await connection.QueryAsync("deleteActivity", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }



        //Update
        public async Task<TranStatus> updateActivity(int Aid, ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@Title", model.Title);
                parameter.Add("@Description", model.Description);
                parameter.Add("@ProductID", model.ProductID);
                parameter.Add("@SalesID", model.SalesID);
                parameter.Add("@ClientID", model.ClientID);
                parameter.Add("@Contact", model.Contact);
                //parameter.Add("@Latitude", model.Latitude);
                //parameter.Add("@Longitude", model.Longitude);
                parameter.Add("@AppointmentDate", model.AppointmentDate);
                parameter.Add("@Modifiedby", model.Modifiedby);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateActivity", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }
       
        ////Change Status Accept to the InProgress
        //public async Task<TranStatus> ChangeStatusInProgress(int id)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@Aid", id);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //        await connection.QueryAsync("ChangeStatusInProgress", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}


        //Update updateInprogress
        public async Task<TranStatus> updateInprogress(int Aid, ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@Status", model.status);
              
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateInprogress", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Update updateToFollowup
        public async Task<TranStatus> updateToFollowup(int Aid, ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@AppointmentDate", model.AppointmentDate);
                parameter.Add("@@Description_on_Followup", model.followup_description);
                parameter.Add("@Status", model.status);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateToFollowup", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Update updateToClose
        public async Task<TranStatus> updateToClose(int Aid, ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@Status", model.status);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateToClose", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //Update updateToCancel
        public async Task<TranStatus> updateToCancel(int Aid, ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@Status", model.status);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateToCancel", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //Activity_History

        //Update
        public async Task<TranStatus> activity_history(int Aid, ActivityListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Aid", Aid);
                parameter.Add("@User_id", model.User_id);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("activity_history", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }
    }
}
