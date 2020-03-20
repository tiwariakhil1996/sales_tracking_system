﻿using System;
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
