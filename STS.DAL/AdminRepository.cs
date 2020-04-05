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
    public class AdminRepository : BaseRepository
    {
       
        TranStatus transaction = new TranStatus();

        //Register
        public async Task<TranStatus> AdminRegister(AdminRegisterModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))

            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
             
                parameter.Add("@Username", model.Username);
                parameter.Add("@Gender", model.Gender);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Mobile", model.Mobile);
                parameter.Add("@Password", model.Password);
                parameter.Add("@Cpassword", model.Cpassword);
                parameter.Add("@Createdby", model.Createdby);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("AdminRegister", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        public async Task<TranStatus> sendmessage(ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminId", model.AdminId);
                parameter.Add("@SalesId", model.SalesId);
                parameter.Add("@Msg", model.Msg);
                parameter.Add("@Createdby", model.Createdby);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("sendmessage", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //public async Task<List<ChatModel>> getchats(int Id)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@SalesId", Id);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        var result = await connection.QueryAsync<ChatModel>("getchat", parameter, commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

        public List<ChatModel> getchats(ChatModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.AdminId);
                parameter.Add("@SalesId", model.SalesId);

                //parameter.Add("@RowCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Query<ChatModel>("getchats", parameter, commandType: CommandType.StoredProcedure);
                //RowCount = parameter.Get<int>("@RowCount");
                return result.ToList();

            }
        }

        //public async Task<TranStatus> getchat(int Id, ChatModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@SalesId", Id);
        //        parameter.Add("@AdminId", model.AdminId);
        //        //parameter.Add("@SalesId", model.SalesId);
        //        parameter.Add("@Msg", model.Msg);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        await connection.QueryAsync("getchat", parameter, commandType: CommandType.StoredProcedure);

        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}

        //Change Password
        public async Task<TranStatus> changeadminPassword(int Id, Changeadmin_passwordModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Id", Id);
                parameter.Add("@OldPassword", model.Oldpassword);
                parameter.Add("@NewPassword", model.Newpassword);
                parameter.Add("@Confirmpassword", model.Confirmpassword);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("changeadminPassword", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Login
        public async Task<Tuple<List<AdminLoginModel>, TranStatus>> AdminLogin(AdminLoginModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", model.ID);
                parameter.Add("@Image", model.Image);
                parameter.Add("@Username", model.Username);
                parameter.Add("@Gender", model.Gender);
                parameter.Add("@Email", model.Email);
                parameter.Add("@Mobile", model.Mobile);
                parameter.Add("@Password", model.Password);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<AdminLoginModel>("AdminLogin", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return new Tuple<List<AdminLoginModel>, TranStatus>(result.ToList(), transaction); 
            }
        }


        //UpdateAdminProfiel
        public async Task<Tuple<List<updateProfileModel>, TranStatus>> updateAdminProfile(updateProfileModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", model.ID);
                parameter.Add("@Image", model.Image);
                parameter.Add("@Username", model.Username);
                parameter.Add("@Gender", model.Gender);
                parameter.Add("@Mobile", model.Mobile);
                parameter.Add("@Companyname", model.Companyname);
                parameter.Add("@Address", model.Address);
             

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<updateProfileModel>("updateAdminProfile", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return new Tuple<List<updateProfileModel>, TranStatus>(result.ToList(), transaction);
            }
        }


    }
}
