using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface ISubcategory
    {
        //Add Subcategory
        Task<TranStatus> AddSubcategory(SubcategoryModel model);

        //View Subcategory
        Task<List<SubcategoryListModel>> SubcategoryList(int id);



        ////Update Prodcut
        //Task<TranStatus> updateProduct(int ID, ProductListModel model);

        ////Delete
        //Task<TranStatus> deleteProduct(int ID);
    }
}

