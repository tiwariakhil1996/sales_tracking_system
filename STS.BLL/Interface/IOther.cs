using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IOther
    {
        

        //Display Country
        Task<List<CountryModel>> CountryList();

        Task<List<StateModel>> StateList(int cid);

        Task<List<CityModel>> CityList(int sid);

        //Add Category
        Task<TranStatus> addCategory(CategoryModel model);

        //Display Category
        Task<List<CategoryListModel>> CategoryList();


        //Update Category
        Task<TranStatus> updateCategory(int Cid, CategoryListModel model);

        //Active Deactive Category
        Task<TranStatus> ChangeStatusCategory(int id);

        //Delete Category
        Task<TranStatus> deleteCategory(int Cid);

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

    }
}

