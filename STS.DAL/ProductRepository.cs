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
                //parameter.Add("@Image", model.Image);
                parameter.Add("@Date", model.Date);
                parameter.Add("@Createdby", model.Createdby);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                //Data Table Type -- to insert multiple image
                DataTable dataTable = CommonHelper.ToDataTable(model.ImageListData);
                parameter.Add("@ImageListing", dataTable.AsTableValuedParameter("dbo.ImageList"));

                await connection.QueryAsync("addProduct", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //Get Product Price
        public async Task<List<ProductPriceModel>> ProductPrice(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Id", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = await connection.QueryAsync<ProductPriceModel>("ProductPrice", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        ////View Products
        public async Task<List<ProductListModel>> ProductList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<ProductListModel>("ProductList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //public async Task<Tuple<List<ProductListModel>, List<GetProductImageListModel>>> ProductList(callProductImageListMode model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        connection.Open();
        //        DynamicParameters parameter = new DynamicParameters();
        //        //parameter.Add("@UserId", model.UserId);
        //        parameter.Add("@Product_ID", model.Product_ID);

        //        var result = await connection.QueryMultipleAsync("ProductList", parameter, commandType: CommandType.StoredProcedure);
        //        IEnumerable<ProductListModel> productListModel = await result.ReadAsync<ProductListModel>();
        //        IEnumerable<GetProductImageListModel> ImageList = await result.ReadAsync<GetProductImageListModel>();
        //        return new Tuple<List<ProductListModel>, List<GetProductImageListModel>>(productListModel.ToList(), ImageList.ToList());
        //    }
        //}

        // Display each admin List Individually
        public async Task<List<ProductListModel>> each_admin_ProductList(ProductListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@AdminID", model.userId);
                var result = await connection.QueryAsync<ProductListModel>("each_admin_ProductList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //Multiple image display
        public async Task<List<Product_Image_ListModel>> Product_Images_List(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Product_Id", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = await connection.QueryAsync<Product_Image_ListModel>("Product_Images_List", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }
        //Delete Multiple Image 
        public async Task<TranStatus> DeleteImage(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Image_ID", id);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                //await connection.QueryMultipleAsync(nameof(deleteClient), parameter, commandType: CommandType.StoredProcedure);
                await connection.QueryAsync("DeleteImage", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }


        // Display each sales List Individually
        public async Task<List<ProductListModel>> each_sales_ProductList(ProductListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@SalesID", model.userId);

                var result = await connection.QueryAsync<ProductListModel>("each_sales_ProductList", parameter, commandType: CommandType.StoredProcedure);
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
                parameter.Add("@Product_ID", ID);
                parameter.Add("@Cid", model.Cid);
                parameter.Add("@Sid", model.Sid);
                parameter.Add("@Productname", model.Productname);
                parameter.Add("@Description", model.Description);
                parameter.Add("@Price", model.Price);
                //parameter.Add("@Image", model.Image);
                parameter.Add("@Date", model.Date);
                parameter.Add("@Modifiedby", model.Modifiedby);
                //Data Table Type -- to update multiple image
                DataTable dataTable = CommonHelper.ToDataTable(model.ImageListData);
                parameter.Add("@ImageListing", dataTable.AsTableValuedParameter("dbo.ImageList"));
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
