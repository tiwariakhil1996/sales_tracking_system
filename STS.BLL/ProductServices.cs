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
        public Task<TranStatus> addProduct(ProductModel model)
        {
            using (productRepository = new ProductRepository())
            {
                return productRepository.addProduct(model);

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


        //Update
        public async Task<TranStatus> updateProduct(int ID, ProductListModel model)
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.updateProduct(ID, model);
            }
        }

        //Delete
        public async Task<TranStatus> deleteProduct(int ID)
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.deleteProduct(ID);
            }
        }
    }
}
