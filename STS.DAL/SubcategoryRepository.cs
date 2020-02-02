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
    public class SubcategoryRepository : BaseRepository
    {
        //Add Category
        public async Task<TranStatus> AddSubcategory(SubcategoryModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@category_id", model.category_id);
                parameter.Add("@subcategory", model.subcategory);
                parameter.Add("@status", model.status);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("AddSubcategory", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;
            }
        }
        //View Subcategory
        public async Task<List<SubcategoryListModel>> SubcategoryList(int catId)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@category_id", catId);
                var result = await connection.QueryAsync<SubcategoryListModel>("SubcategoryList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
        }

        ////Update
        //public async Task<TranStatus> updateProduct(int ID, ProductListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID",ID);
        //        parameter.Add("@Category", model.Category);
        //        parameter.Add("@Subcategory", model.Subcategory);
        //        parameter.Add("@Productname", model.Productname);
        //        parameter.Add("@Description", model.Description);
        //        parameter.Add("@Price", model.Price);
        //        parameter.Add("@Image", model.Image);
        //        parameter.Add("@Date", model.Date);
        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //        await connection.QueryAsync("updateProduct", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}


        ////Delete
        //public async Task<TranStatus> deleteProduct(int ID)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID", ID);
        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        //await connection.QueryMultipleAsync(nameof(deleteClient), parameter, commandType: CommandType.StoredProcedure);
        //        await connection.QueryAsync("deleteProduct", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}

    }
}