using STS.Common;
using STS.DAL;
using STS.Model;
using System.Collections.Generic;
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
        ////View Products
        //public async Task<Tuple<List<ProductListModel>, List<GetProductImageListModel>>> ProductList(callProductImageListMode model)
        //{
        //    using (productRepository = new ProductRepository())
        //    {
        //        return await productRepository.ProductList(model);
        //    }
        //}

        // Display each admin List Individually
        //public async Task<List<ProductListModel>> each_admin_ProductList(ProductListModel model)
        //{
        //    using (productRepository = new ProductRepository())
        //    {
        //        return await productRepository.each_admin_ProductList(model);
        //    }

        //}

        public List<ProductListModel> each_admin_ProductList(ProductListModel model, out int RowCount)
        {
            using (productRepository = new ProductRepository())
            {
                return  productRepository.each_admin_ProductList(model, out RowCount);
            }

        }

        //Multiple Image Display
        public async Task<List<Product_Image_ListModel>> Product_Images_List(int id)
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.Product_Images_List(id);
            }
        }
        //Delete Multiple Image
        public async Task<TranStatus> DeleteImage(int id)
        {
            using (productRepository = new ProductRepository())
            {
                return await productRepository.DeleteImage(id);
            }
        }




        // Display each sales List Individually
        //public async Task<List<ProductListModel>> each_sales_ProductList(ProductListModel model)
        //{
        //    using (productRepository = new ProductRepository())
        //    {
        //        return await productRepository.each_sales_ProductList(model);
        //    }

        //}


        public List<ProductListModel> each_sales_ProductList(ProductListModel model, out int RowCount)
        {
            using (productRepository = new ProductRepository())
            {
                return productRepository.each_sales_ProductList(model, out RowCount);
            }

        } 
        
        public List<ProductListModel> each_user_ProductList(ProductListModel model, out int RowCount)
        {
            using (productRepository = new ProductRepository())
            {
                return productRepository.each_user_ProductList(model, out RowCount);
            }

        }


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
