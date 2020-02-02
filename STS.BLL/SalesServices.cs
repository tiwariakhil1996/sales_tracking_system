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

        //Display
        //public async Task<List<SalesListModel>> RegisterSalesList()
        //{
        //    using (salesRepository = new SalesRepository())
        //    {
        //        return await salesRepository.RegisterSalesList();
        //    }
        //}
    }
}
