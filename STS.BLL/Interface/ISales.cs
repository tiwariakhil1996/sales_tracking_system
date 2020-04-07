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
        //Task<TranStatus> SalesLogout(SalesModel model);


        //Login
        //Task<TranStatus> SalesLogin(SalesLoginModel model);

        Task<Tuple<List<SalesLoginModel>, TranStatus>> SalesLogin(SalesLoginModel model);


        //UpdateAdminProfile
        //Task<TranStatus> updateSalesProfile(updateSalesModel model);
        Task<Tuple<List<updateSalesModel>, TranStatus>> updateSalesProfile(updateSalesModel model);

        //Change Status Sales
        Task<TranStatus> ChangeStatusSales(int id);

        // SalesLogout
        Task<TranStatus> SalesLogout(int id);

        //Display
       Task<List<SalesListModel>> RegisteredSalesList();



        // Display by createdby which admin
        //Task<List<SalesListModel>> RegisteredSalesList(SalesListModel model);

        List<SalesListModel> RegisteredSalesList(SalesListModel model, out int RowCount);

        //Display Active Deactive Sales
        Task<List<SalesListModel>> SalesList_ActiveDeactive();

        //Delete
        Task<TranStatus> deleteSales(int ID);
        Task<TranStatus> deleteProfilepic(int ID);


        //Change Password
        Task<TranStatus> changesalesPassword(int Id, ChangepasswordModel model);


        //Task<List<Refresh_Sales_Location_Model>> Refresh_Sales_Location(Refresh_Sales_Location_Model model);

        //Task<TranStatus> Refresh_Sales_Location(Refresh_Sales_Location_Model model);

        Task<TranStatus> Refresh_Sales_Location(Refresh_Sales_Location_Model model);


        // Sales List in dropdown
        Task<List<SalesList_DropdownModel>> SalesList_dropdown(SalesList_DropdownModel model);

        Task<Tuple<List<ChatModel>, TranStatus>> getsaleschats(ChatModel model);
        Task<Tuple<List<StatusModel>, TranStatus>> getadminstatus(StatusModel model);

    }
}

