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
    public class Category_SubcategoryServices : ICategory_Subcategory

    {
        Category_SubcategoryRepository categoryRepository = null;


        //-----------------------------------------------------      CATEGORY    --------------------------------------------


        //Add Category

        public Task<TranStatus> addCategory(CategoryModel model)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return categoryRepository.addCategory(model);

            }
        }

        // Display Category
        public async Task<List<CategoryListModel>> CategoryList()
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.CategoryList();
            }
        }

        //Update Category
        public async Task<TranStatus> updateCategory(int Cid, CategoryListModel model)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.updateCategory(Cid, model);
            }
        }


        //Change Status Category
        public async Task<TranStatus> ChangeStatusCategory(int id)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.ChangeStatusCategory(id);
            }
        }

        // Display  Active Deactive Category List
        public async Task<List<CategoryListModel>> CategoryList_ActiveDeactive()
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.CategoryList_ActiveDeactive();
            }
        }

        //Delete Category
        public async Task<TranStatus> deleteCategory(int Cid)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.deleteCategory(Cid);
            }
        }

        //--------------------------------------------------------      SUBCATEGORY    -------------------------------------------

        //Add Subcategory

        public Task<TranStatus> addSubcategory(SubcategoryModel model)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return categoryRepository.addSubcategory(model);

            }
        }

        //Display Subcategory
        public async Task<List<SubcategoryListModel>> SubcategoryList(int catid)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.SubcategoryList(catid);
            }
        }

        //View Subcategory
        public async Task<List<SubcategoryListModel>> ViewSubcategoryList()
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.ViewSubcategoryList();
            }
        }

        //Update Subcategory
        public async Task<TranStatus> updateSubcategory(int Sid, SubcategoryListModel model)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.updateSubcategory(Sid, model);
            }
        }

        //Delete Subcategory
        public async Task<TranStatus> deleteSubcategory(int Sid)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.deleteSubcategory(Sid);
            }
        }

        //Change Status Subcategory
        public async Task<TranStatus> ChangeStatusSubcategory(int id)
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.ChangeStatusSubcategory(id);
            }
        }

        // Display  Active Deactive Subategory List
        public async Task<List<SubcategoryListModel>> SubcategoryList_ActiveDeactive()
        {
            using (categoryRepository = new Category_SubcategoryRepository())
            {
                return await categoryRepository.SubcategoryList_ActiveDeactive();
            }
        }


    }
}
