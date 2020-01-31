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
    public class DemoServices : IDemo

    {
        //Add Products
        DemoRepository demoRepository = null;
        public Task<TranStatus> AddDemo(DemoModel model)
        {
            using (demoRepository = new DemoRepository())
            {
                return demoRepository.AddDemo(model);

            }
        }

        //View Demo
        public async Task<List<DemoListModel>> DemoList()
        {
            using (demoRepository = new DemoRepository())
            {
                return await demoRepository.DemoList();
            }
        }


        ////Update
        //public async Task<TranStatus> updateProduct(int ID, ProductListModel model)
        //{
        //    using (productRepository = new ProductRepository())
        //    {
        //        return await productRepository.updateProduct(ID, model);
        //    }
        //}

        ////Delete
        //public async Task<TranStatus> deleteProduct(int ID)
        //{
        //    using (productRepository = new ProductRepository())
        //    {
        //        return await productRepository.deleteProduct(ID);
        //    }
        //}
    }
}
