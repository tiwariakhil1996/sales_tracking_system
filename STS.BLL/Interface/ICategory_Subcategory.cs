using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface ICategory_Subcategory
    {

        //----------------------------------------------------------------   CATEGORY  ------------------------------------


        //Add Category
        Task<TranStatus> addCategory(CategoryModel model);

        //Display Category
        Task<List<CategoryListModel>> CategoryList();
        //Task<List<CategoryListModel>> admin_CategoryList();

        List<CategoryListModel> admin_CategoryList(CategoryListModel model, out int RowCount);
        List<SubcategoryListModel> admin_subcategoryList(SubcategoryListModel model, out int RowCount);


        //Update Category
        Task<TranStatus> updateCategory(int Cid, CategoryListModel model);

        //Active Deactive Category
        Task<TranStatus> ChangeStatusCategory(int id);

        //Display Active Deactive Category
        Task<List<CategoryListModel>> CategoryList_ActiveDeactive();


        //Delete Category
        Task<TranStatus> deleteCategory(int Cid);


        //-----------------------------------------------------------------------   SUBCATEGORY  ---------------------------------------

        // Add Subcategory
        Task<TranStatus> addSubcategory(SubcategoryModel model);

        //Display Subcategory
        Task<List<SubcategoryListModel>> SubcategoryList(int cid);

        //View Subcategory
        Task<List<SubcategoryListModel>> ViewSubcategoryList();

        //Update Subcategory
        Task<TranStatus> updateSubcategory(int Sid, SubcategoryListModel model);


        //Delete Subcategory
        Task<TranStatus> deleteSubcategory(int Sid);

        //Active Deactive Subategory
        Task<TranStatus> ChangeStatusSubcategory(int id);

        //Display Active Deactive Subcategory
        Task<List<SubcategoryListModel>> SubcategoryList_ActiveDeactive();

    }
}

