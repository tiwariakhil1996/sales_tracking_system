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
                parameter.Add("@SalesID", model.SalesID);
                parameter.Add("@ClientID", model.ClientID);
                parameter.Add("@Contact", model.Contact);

                parameter.Add("@AppointmentDate", model.AppointmentDate);
                parameter.Add("@Createdby", model.Createdby);

                //Data Table Type -- to insert multiple products 
                DataTable dataTable = model.ProductList.ToDataTable();
                parameter.Add("@ProductDetails", dataTable.AsTableValuedParameter("dbo.ProductList"));
                //parameter.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("addActivity", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // Latest added Activity
        //public async Task<List<ActivityModel>> addActivity()
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        var result = await connection.QueryAsync<ActivityModel>("addActivity", commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}



        //Display Activity
        public async Task<List<ActivityListModel>> ActivityList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ActivityListModel>("ActivityList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        // Display Products Added into activity
        public async Task<List<Activity_ProductListModel>> Activity_ProductList(int aid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Activity_Id", aid);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = await connection.QueryAsync<Activity_ProductListModel>("Activity_ProductList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        public async Task<List<ActivityDetailsModel>> activity_Details(int aid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Activity_Id", aid);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<ActivityDetailsModel>("activity_Details", parameter, commandType: CommandType.StoredProcedure);
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
        //public async Task<List<ActivityListModel>> each_sales_activityList(ActivityListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@SalesID", model.userId);

        //        var result = await connection.QueryAsync<ActivityListModel>("each_sales_activityList", parameter, commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

        public List<ActivityListModel> each_sales_activityList(ActivityListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SalesID", model.userId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);
                parameter.Add("@Search", model.Search);
                parameter.Add("@From_Date", model.From_date);
                parameter.Add("@To_Date", model.To_date);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ActivityListModel>("each_sales_activityList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }

        // Display each admin List Individually
        //public async Task<List<admin_ActivityListModel>> each_admin_activityList(admin_ActivityListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@AdminID", model.userId);

        //        var result = await connection.QueryAsync<admin_ActivityListModel>("each_admin_activityList", parameter, commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

        public List<admin_ActivityListModel>each_admin_activityList(admin_ActivityListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.userId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);
                parameter.Add("@Search", model.Search);
                parameter.Add("@From_Date", model.From_date);
                parameter.Add("@To_Date", model.To_date);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<admin_ActivityListModel>("each_admin_activityList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }
         public List<admin_ActivityListModel> each_user_activityList(admin_ActivityListModel model, out int RowCount)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@UserID", model.userId);
                parameter.Add("@pageIndex", model.pageIndex);
                parameter.Add("@pageSize", model.pageSize);

                parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<admin_ActivityListModel>("each_user_activityList", parameter, commandType: CommandType.StoredProcedure);
                RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }



        // Display Sales lat lng ..whom admin has added
        public async Task<List<Sales_Location_Model>> each_admins_sales_Location(Sales_Location_Model model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Admin_ID", model.UserId);

                var result = await connection.QueryAsync<Sales_Location_Model>("each_admins_sales_Location", parameter, commandType: CommandType.StoredProcedure);
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



        //Delete Activity
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


      

        //Delete Activity Product
        public async Task<TranStatus> deleteActivity_Product(int productId)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ProductId", productId);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                //await connection.QueryMultipleAsync(nameof(deleteClient), parameter, commandType: CommandType.StoredProcedure);
                await connection.QueryAsync("deleteActivity_Product", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Update  Activity
        public async Task<TranStatus> updateActivity(int Aid, Update_ActivityModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Activity_Id", Aid);

                parameter.Add("@Title", model.Title);
                parameter.Add("@Description", model.Description);
                parameter.Add("@SalesID", model.SalesID);
                parameter.Add("@ClientID", model.ClientID);
                parameter.Add("@Contact", model.Contact);
                parameter.Add("@AppointmentDate", model.AppointmentDate);

                parameter.Add("@advance_pay", model.Advance_pay);
                parameter.Add("@paymentmode", model.paymentmode);
                parameter.Add("@paydue", model.paydue);

                parameter.Add("@Modifiedby", model.Modifiedby);


                //Data Table Type -- to insert multiple products 
                DataTable dataTable = model.ProductList.ToDataTable();
                parameter.Add("@ProductDetails", dataTable.AsTableValuedParameter("dbo.ProductList"));

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateActivity", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }





        //Update Products  added in activity
        public async Task<TranStatus> update_old_Products(int Aid, Update_products_in_ActivityModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Activity_Id", Aid);
                parameter.Add("@Order_Id", model.Order_Id);
                parameter.Add("@ProductID", model.ProductID);
                //parameter.Add("@Price", model.Price);
                parameter.Add("@Quantity", model.Quantity);
                parameter.Add("@Amount", model.Amount);
                parameter.Add("@Discount_per", model.Discount_per);
                parameter.Add("@Discount_amt", model.Discount_amt);
                parameter.Add("@Total_price", model.Total_price);


                parameter.Add("@Modifiedby", model.Modifiedby);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("update_old_Products", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


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
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);
                
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
                parameter.Add("@Description_on_Followup", model.followup_description);
                parameter.Add("@Status", model.status);
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);

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
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);

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
                parameter.Add("@Latitude", model.Latitude);
                parameter.Add("@Longitude", model.Longitude);

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

        // Activity Lat Long
        public async Task<List<Activity_Location_Model>> Activity_Location(int aid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Activity_Id", aid);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = await connection.QueryAsync<Activity_Location_Model>("Activity_Location", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        // Search Title
        //public async Task<List<ActivityListModel>> searchTitle(string Title)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@Search", Title);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        var result = await connection.QueryAsync<ActivityListModel>("searchTitle", parameter, commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

        public async Task<List<ActivityListModel>> searchTitle(int aid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Search", aid);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = await connection.QueryAsync<ActivityListModel>("searchTitle", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }




        //public async Task<List<ActivityListModel>> searchTitle()
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        var result = await connection.QueryAsync<ActivityListModel>("searchTitle", commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

        //public async Task<TranStatus> searchTitle(ActivityListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@Search", model.Title);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //        await connection.QueryAsync("searchTitle", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}
    }
}
