using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface ISales
    {
        //Register
        Task<TranStatus> RegisterSales(SalesModel model);


        //Login
        //Task<TranStatus> SalesLogin(SalesLoginModel model);

        Task<Tuple<List<SalesLoginModel>, TranStatus>> SalesLogin(SalesLoginModel model);


        //UpdateAdminProfile
        //Task<TranStatus> updateSalesProfile(updateSalesModel model);
        Task<Tuple<List<updateSalesModel>, TranStatus>> updateSalesProfile(updateSalesModel model);

        //Change Status Sales
        Task<TranStatus> ChangeStatusSales(int id);
        

        //Display
        Task<List<SalesListModel>> RegisteredSalesList();

        //Display Active Deactive Sales
        Task<List<SalesListModel>> SalesList_ActiveDeactive();

        //Delete
        Task<TranStatus> deleteSales(int ID);

        //Change Password
        Task<TranStatus> changesalesPassword(int Id, ChangePasswordModel model);
    }
}

