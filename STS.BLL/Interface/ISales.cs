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

        //Display
        Task<List<SalesListModel>> RegisteredSalesList();

        //Delete
        Task<TranStatus> deleteSales(int ID);
    }
}

