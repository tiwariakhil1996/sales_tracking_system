using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface ICategory
    {
        //Add Category
        Task<TranStatus> AddCategory(CategoryModel model);

        //View Category
        Task<List<CategoryListModel>> CategoryList();

        ////Update Prodcut
        //Task<TranStatus> updateProduct(int ID, ProductListModel model);

        ////Delete
        //Task<TranStatus> deleteProduct(int ID);
    }
}

