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
    public class CategoryServices : ICategory

    {
        //Add Products
        CategoryRepository categoryRepository = null;
        public Task<TranStatus> AddCategory(CategoryModel model)
        {
            using (categoryRepository = new CategoryRepository())
            {
                return categoryRepository.AddCategory(model);

            }
        }

        //View Category
        public async Task<List<CategoryListModel>> CategoryList()
        {
            using (categoryRepository = new CategoryRepository())
            {
                return await categoryRepository.CategoryList();
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
