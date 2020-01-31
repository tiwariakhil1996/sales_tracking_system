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
    public class SubcategoryServices : ISubcategory

    {
        //Add Products
        SubcategoryRepository subcategoryRepository = null;
        public Task<TranStatus> AddSubcategory(SubcategoryModel model)
        {
            using (subcategoryRepository = new SubcategoryRepository())
            {
                return subcategoryRepository.AddSubcategory(model);

            }
        }

        //View Subcategory
        public async Task<List<SubcategoryListModel>> SubcategoryList()
        {
            using (subcategoryRepository = new SubcategoryRepository())
            {
                return await subcategoryRepository.SubcategoryList();
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
