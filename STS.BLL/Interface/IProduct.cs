using STS.Common;
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
        //Task<Tuple<List<ProductListModel>, List<GetProductImageListModel>>> ProductList(callProductImageListMode model);



        // Display each admin List Individually
        Task<List<ProductListModel>> each_admin_ProductList(ProductListModel model);
        //Multiple Image Display
        Task<List<Product_Image_ListModel>> Product_Images_List(int id);
        //Delete Multiple Image
        Task<TranStatus>DeleteImage(int id);


        Task<List<Product_Image_ListModel>> Product_Images_List(int id);

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

        //Delete Multiple Image
        Task<TranStatus> DeleteImage(int id);

    }
}

