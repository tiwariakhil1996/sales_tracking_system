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
        //Add Products
        ProductRepository productRepository = null;
        public Task<TranStatus>AddProduct(ProductModel model)
        {
            using (productRepository = new ProductRepository())
            {
                return productRepository.AddProduct(model);

            }
        }

        //View Products
        public async Task<List<ProductListModel>> ProductList()
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.ProductList();
            }
        }
    }
}
