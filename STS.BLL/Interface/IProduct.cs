﻿using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IProduct
    {
        //Add Products
        Task<TranStatus> addProduct(ProductModel model);

        //View Products
        Task<List<ProductListModel>> ProductList();

        // Display each admin List Individually
        Task<List<ProductListModel>> each_admin_ProductList(ProductListModel model);

        // Display each sales List Individually
        Task<List<ProductListModel>> each_sales_ProductList(ProductListModel model);

        // Get Product Price
        Task<List<ProductPriceModel>> ProductPrice(int id);

        //Update Product
        Task<TranStatus> updateProduct(int ID, ProductListModel model);

        //Delete
        Task<TranStatus> deleteProduct(int ID);


        //Change Status Product
        Task<TranStatus> ChangeStatusProduct(int id);


        //Display Active Deactive Category
        Task<List<ProductListModel>> ProductList_ActiveDeactive();

    }
}

