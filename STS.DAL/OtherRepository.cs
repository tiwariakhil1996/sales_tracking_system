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
    public class OtherRepository : BaseRepository
    {


        //Display  Country
        public async Task<List<CountryModel>> CountryList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<CountryModel>("CountryList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //Display State
        public async Task<List<StateModel>> StateList(int cnid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", cnid);
                var result = await connection.QueryAsync<StateModel>("StateList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //Display City
        public async Task<List<CityModel>> CityList(int stid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sid", stid);
                var result = await connection.QueryAsync<CityModel>("CityList", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //Insert Category
        public async Task<TranStatus> addCategory(CategoryModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cname", model.Cname);
             
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("addCategory", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        // Display Category
        public async Task<List<CategoryListModel>> CategoryList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                var result = await connection.QueryAsync<CategoryListModel>("CategoryList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //Update Category
        public async Task<TranStatus> updateCategory(int Cid, CategoryListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", Cid);
                parameter.Add("@Cname", model.Cname);
              
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateCategory", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }
        //Change Status Category
        public async Task<TranStatus> ChangeStatusCategory(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", id);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("ChangeStatusCategory", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;
            }
        }


        //Delete Category
        public async Task<TranStatus> deleteCategory(int Cid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", Cid);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("deleteCategory", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //Insert SubCategory
        public async Task<TranStatus> addSubcategory(SubcategoryModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sname", model.Sname);
                parameter.Add("@Cid", model.Cid);

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("addSubcategory", parameter, commandType: CommandType.StoredProcedure);

                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

       

        // Display Subcategory selected by category and display the subcategory
        public async Task<List<SubcategoryListModel>> SubcategoryList(int catid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Cid", catid);
                var result = await connection.QueryAsync<SubcategoryListModel>("SubcategoryList",parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }

        //Display Subcategory
        public async Task<List<SubcategoryListModel>>   ViewSubcategoryList()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                var result = await connection.QueryAsync<SubcategoryListModel>("ViewSubcategoryList", commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
        }


        //Update Subcategory
        public async Task<TranStatus> updateSubcategory(int Sid, SubcategoryListModel model)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sid", Sid);
                parameter.Add("@Cid", model.Cid);
                parameter.Add("@Sname", model.Sname);

            

                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
                await connection.QueryAsync("updateSubcategory", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        //Delete Subcategory
        public async Task<TranStatus> deleteSubcategory(int Sid)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                await connection.OpenAsync();
                TranStatus transaction = new TranStatus();
                DynamicParameters parameter = new DynamicParameters();
                parameter.Add("@Sid", Sid);
                parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
                parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.QueryAsync("deleteSubcategory", parameter, commandType: CommandType.StoredProcedure);
                transaction.returnMessage = parameter.Get<string>("@Message");
                transaction.code = parameter.Get<int>("@Code");
                return transaction;

            }
        }

        ////Update
        //public async Task<TranStatus> updateClient(int ID, ClientListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID", ID);
        //        parameter.Add("@ClientName", model.ClientName);
        //        parameter.Add("@Email", model.Email);
        //        parameter.Add("@Contact", model.Contact);
        //        parameter.Add("@Gender", model.Gender);
        //        parameter.Add("@Address", model.Address);
        //        parameter.Add("@Street", model.Street);
        //        parameter.Add("@Country", model.Country);
        //        parameter.Add("@State", model.State);
        //        parameter.Add("@City", model.City);
        //        parameter.Add("@PostalCode", model.PostalCode);
        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //        await connection.QueryAsync("updateClient", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}

        ////Update
        //public async Task<Tuple<TranStatus,List<ClientListModel>>> updateClient(int ID, ClientListModel model)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        await connection.OpenAsync();
        //        TranStatus transaction = new TranStatus();
        //        DynamicParameters parameter = new DynamicParameters();
        //        parameter.Add("@ID", model.ID);
        //        parameter.Add("@ClientName", model.ClientName);
        //        parameter.Add("@Email", model.Email);
        //        parameter.Add("@Contact", model.Contact);
        //        parameter.Add("@Gender", model.Gender);
        //        parameter.Add("@Address", model.Address);
        //        parameter.Add("@Street", model.Street);
        //        parameter.Add("@Country", model.Country);
        //        parameter.Add("@State", model.State);
        //        parameter.Add("@City", model.City);
        //        parameter.Add("@PostalCode", model.PostalCode);

        //        parameter.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 500);
        //        parameter.Add("@Code", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        IEnumerable<ClientListModel> clientList = await connection.QueryAsync<ClientListModel>("updateClient", parameter, commandType: CommandType.StoredProcedure);

        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return new Tuple<TranStatus, List<ClientListModel>>(transaction, clientList.ToList());
        //    }
        //}


        ////Delete
        //public async Task<TranStatus> deleteClient(int ID)
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
        //        await connection.QueryAsync("deleteClient", parameter, commandType: CommandType.StoredProcedure);
        //        transaction.returnMessage = parameter.Get<string>("@Message");
        //        transaction.code = parameter.Get<int>("@Code");
        //        return transaction;

        //    }
        //}


    }
}
