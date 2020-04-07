using STS.Common;
using STS.DAL;
using STS.Model;
using System;
using System.Collections.Generic;
using System.Text;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class SalesServices : ISales

    {
        SalesRepository salesRepository = null;

        //Register
        public Task<TranStatus> RegisterSales(SalesModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.RegisterSales(model);

            }
        }

        // SalesLogout
        //public Task<TranStatus> SalesLogout(SalesModel model)
        //{
        //    using (salesRepository = new SalesRepository())
        //    {
        //        return salesRepository.SalesLogout(model);

        //    }
        //}


        // Login

        //SalesRepository salesloginRepository = null;
        //public Task<TranStatus> SalesLogin(SalesLoginModel model)
        //{
        //    using (salesloginRepository = new SalesRepository())
        //    {
        //        return salesloginRepository.SalesLogin(model);

        //    }
        //}

        public Task<Tuple<List<SalesLoginModel>, TranStatus>> SalesLogin(SalesLoginModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.SalesLogin(model);
            }

        }


        //UpdateSalesProfile
        //public Task<TranStatus> updateSalesProfile(updateSalesModel model)
        //{
        //    using (salesRepository = new SalesRepository())
        //    {
        //        return salesRepository.updateSalesProfile(model);
        //    }
        //}

        public Task<Tuple<List<updateSalesModel>, TranStatus>> updateSalesProfile(updateSalesModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.updateSalesProfile(model);
            }
        }

        //Change Status Sales
        public async Task<TranStatus> ChangeStatusSales(int id)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.ChangeStatusSales(id);
            }
        }

        // SalesLogout

        public async Task<TranStatus> SalesLogout(int id)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.SalesLogout(id);
            }
        }

        //Display
        public async Task<List<SalesListModel>> RegisteredSalesList()
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.RegisteredSalesList();
            }
        }

        //public async Task<List<SalesListModel>> RegisteredSalesList(SalesListModel model)
        //{
        //    using (salesRepository = new SalesRepository())  
        //    {
        //        return await salesRepository.RegisteredSalesList(model);
        //    }

        //}

        public List<SalesListModel> RegisteredSalesList(SalesListModel model, out int RowCount)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.RegisteredSalesList(model, out RowCount);
            }

        }


        // Display  Active Deactive Sales List
        public async Task<List<SalesListModel>> SalesList_ActiveDeactive()
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.SalesList_ActiveDeactive();
            }
        }


        //Delete
        public async Task<TranStatus> deleteSales(int ID)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.deleteSales(ID);
            }
        } 
        
        public async Task<TranStatus> deleteProfilepic(int ID)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.deleteProfilepic(ID);
            }
        }

        //Change Passoword
        public async Task<TranStatus> changesalesPassword(int Id, ChangepasswordModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.changesalesPassword(Id, model);
            }
        }


        //public async Task<TranStatus> Refresh_Sales_Location(Refresh_Sales_Location_Model model)
        //{
        //    using (salesRepository = new SalesRepository())
        //    {
        //        return await salesRepository.Refresh_Sales_Location(model);
        //    }
        //}


        public Task<TranStatus> Refresh_Sales_Location(Refresh_Sales_Location_Model model)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.Refresh_Sales_Location(model);

            }
        }

        // Sales List in dropdown

        public async Task<List<SalesList_DropdownModel>> SalesList_dropdown(SalesList_DropdownModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.SalesList_dropdown(model);
            }

        }

        public Task<Tuple<List<ChatModel>, TranStatus>> getsaleschats(ChatModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.getsaleschats(model);
            }

        }  
        
        public Task<Tuple<List<StatusModel>, TranStatus>> getadminstatus(StatusModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return salesRepository.getadminstatus(model);
            }

        }

    }
}
