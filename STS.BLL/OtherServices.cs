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
    public class OtherServices : IOther

    {
        OtherRepository otherRepository = null;

      


        //Display Country
        public async Task<List<CountryModel>> CountryList()
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.CountryList();
            }
        }

        //Display State
        public async Task<List<StateModel>> StateList(int cnid)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.StateList(cnid);
            }
        }

        //Display City
        public async Task<List<CityModel>> CityList(int stid)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.CityList(stid);
            }
        }


        //Add Category
      
        public Task<TranStatus> addCategory(CategoryModel model)
        {
            using (otherRepository = new OtherRepository())
            {
                return otherRepository.addCategory(model);

            }
        }

        // Display Category
        public async Task<List<CategoryListModel>> CategoryList()
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.CategoryList();
            }
        }

        //Update Category
        public async Task<TranStatus> updateCategory(int Cid, CategoryListModel model)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.updateCategory(Cid, model);
            }
        

        //Change Status Category
        public async Task<TranStatus> ChangeStatusCategory(int id)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.ChangeStatusCategory(id);
            }
        }

        //Delete Category
        public async Task<TranStatus> deleteCategory(int Cid)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.deleteCategory(Cid);
            }
        }

        //Add Subcategory

        public Task<TranStatus> addSubcategory(SubcategoryModel model)
        {
            using (otherRepository = new OtherRepository())
            {
                return otherRepository.addSubcategory(model);

            }
        }

        //Display Subcategory
        public async Task<List<SubcategoryListModel>> SubcategoryList(int catid)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.SubcategoryList(catid);
            }
        }

        //View Subcategory
        public async Task<List<SubcategoryListModel>> ViewSubcategoryList()
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.ViewSubcategoryList();
            }
        }

        //Update Subcategory
        public async Task<TranStatus> updateSubcategory(int Sid, SubcategoryListModel model)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.updateSubcategory(Sid, model);
            }
        }

        //Delete Subcategory
        public async Task<TranStatus> deleteSubcategory(int Sid)
        {
            using (otherRepository = new OtherRepository())
            {
                return await otherRepository.deleteSubcategory(Sid);
            }
        }
    }
}
