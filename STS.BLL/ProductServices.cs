﻿using STS.Common;
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

        //public async Task<Tuple<List<ProductListModel>, List<GetPropertyImageListModel>>> ProductList(callPropertyImageListModel model)
        //{
        //    using (productRepository = new ProductRepository())
        //    {
        //        return await productRepository.ProductList(model);
        //    }
        //}

        //Get Product Price
        public async Task<List<ProductPriceModel>> ProductPrice(int id)
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.ProductPrice(id);
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

        //Change Status Product
        public async Task<TranStatus> ChangeStatusProduct(int id)
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.ChangeStatusProduct(id);
            }
        }

        // Display  Active Deactive Product List
        public async Task<List<ProductListModel>> ProductList_ActiveDeactive()
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.ProductList_ActiveDeactive();
            }
        }


    }
}
