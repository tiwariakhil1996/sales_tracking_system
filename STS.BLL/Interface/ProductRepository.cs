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
    public class ProductRepository : BaseRepository
    {
        //Add Products
        public async Task<TranStatus> addProduct(ProductModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", model.Cid);
                parameter.Add("@Sid", model.Sid);
                parameter.Add("@Productname", model.Productname);
                parameter.Add("@Description", model.Description);
                parameter.Add("@Price", model.Price);
                parameter.Add("@Image", model.Image);
                parameter.Add("@Date", model.Date);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("addProduct", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;
            }
        }
        //View Products
        public async Task<List<ProductListModel>> ProductList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ProductListModel>("ProductList", commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
        }

        //Update
        public async Task<TranStatus> updateProduct(int ID, ProductListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@ID", ID);
                parameter.Add("@Cid", model.Cid);
                parameter.Add("@Sid", model.Sid);
                parameter.Add("@Productname", model.Productname);
                parameter.Add("@Description", model.Description);
                parameter.Add("@Price", model.Price);
                parameter.Add("@Image", model.Image);
                parameter.Add("@Date", model.Date);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateProduct", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        //Delete
        public async Task<TranStatus> deleteProduct(int ID)
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
                await connection.QueryAsync("deleteProduct", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //Change Status Product
        public async Task<TranStatus> ChangeStatusProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Id", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("ChangeStatusProduct", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // Display Active Deactive Product
        public async Task<List<ProductListModel>> ProductList_ActiveDeactive()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ProductListModel>("ProductList_ActiveDeactive", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

    }
}