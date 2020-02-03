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
    public class AddactivityServices : IAddactivity

    {
        //Add Products
        AddactivityRepository addactivityRepository = null;
        public Task<TranStatus> Addactivity(AddactivityModel model)
        {
            using (addactivityRepository = new AddactivityRepository())
            {
                return addactivityRepository.Addactivity(model);

            }
        }

       
        //View Products
        public async Task<List<AddactivityListModel>> AddactivityList()
        {
            using (addactivityRepository = new AddactivityRepository())
            {
                return await addactivityRepository.AddactivityList();
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
