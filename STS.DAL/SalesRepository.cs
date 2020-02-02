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
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("RegisterSales", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //public async Task<TranStatus> RegisterSales(SalesModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))

        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@Image", model.Image);
        //        parameter.Add("@SalesName", model.SalesName);
        //        parameter.Add("@Email", model.Email);
        //        parameter.Add("@Gender", model.Gender);
        //        parameter.Add("@Mobile", model.Mobile);
        //        parameter.Add("@Adharcard", model.Adharcard);
        //        parameter.Add("@Address", model.Address);
        //        parameter.Add("@Password", model.Password);
        //        parameter.Add("@Cpassword", model.Cpassword);
        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        await connection.QueryAsync("RegisterSales", parameter, commandType: CommandType.StoredProcedure);

        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}



        //Login
        //public async Task<TranStatus> SalesLogin(SalesLoginModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))

        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID", model.ID);
        //        parameter.Add("@SalesName", model.SalesName);
        //        parameter.Add("@Email", model.Email);
        //        parameter.Add("@Password", model.Password);
        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        await connection.QueryAsync("SalesLogin", parameter, commandType: CommandType.StoredProcedure);

        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}

        public async Task<Tuple<List<SalesLoginModel>, TranStatus>> SalesLogin(SalesLoginModel model)
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
        //public async Task<TranStatus> updateSalesProfile(updateSalesModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID", model.ID);
        //        parameter.Add("@Image", model.Image);
        //        parameter.Add("@SalesName", model.SalesName);
        //        parameter.Add("@Email", model.Email);
        //        parameter.Add("@Gender", model.Gender);
        //        parameter.Add("@Mobile", model.Mobile);
        //        parameter.Add("@Adharcard", model.Adharcard);
        //        parameter.Add("@Address", model.Address);
        //        parameter.Add("@Password", model.Password);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //        await connection.QueryAsync("updateSalesProfile", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;
        //    }
        //}

        //Display
        //public async Task<List<SalesListModel>> RegisterSalesList()
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        var result = await connection.QueryAsync<SalesListModel>("RegisterSalesList", commandType: CommandType.StoredProcedure);
        //        return result.ToList();

        //    }
        //}

    }
}
