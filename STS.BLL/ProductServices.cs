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
    public class ProductServices : IProduct

    {
        ProductRepository productRepository = null;
        public Task<TranStatus> addProduct(ProductModel model)
        {
            using (productRepository = new ProductRepository())
            {
                return productRepository.addProduct(model);

            }
        }

        //public async Task<List<RegisterListModel>> RegisterList()
        //{
        //    using (userRepository = new UserRepository())
        //    {
        //        return await userRepository.RegisterList();
        //    }
        //}
    }
}
