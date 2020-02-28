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


        //Display
        public async Task<List<SalesListModel>> RegisteredSalesList()
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.RegisteredSalesList();
            }
        }

        public async Task<List<SalesListModel>> RegisteredSalesList(SalesListModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.RegisteredSalesList(model);
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

        //Change Passoword
        public async Task<TranStatus> changesalesPassword(int Id, ChangepasswordModel model)
        {
            using (salesRepository = new SalesRepository())
            {
                return await salesRepository.changesalesPassword(Id, model);
            }
        }
    }
}
