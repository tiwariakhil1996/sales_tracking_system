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

        // Add Subcategory
        Task<TranStatus> addSubcategory(SubcategoryModel model);

        //Display Subcategory
        Task<List<SubcategoryListModel>> SubcategoryList(int cid);

    }
}

