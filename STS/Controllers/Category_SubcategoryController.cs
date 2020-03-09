using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using STS.BLL.Interface;
using STS.Common;
using STS.Model;
using Microsoft.AspNetCore.Mvc;

namespace STS.Controllers
{
    [Route("api/[controller]")]
    public class Category_SubcategoryController : Controller
    {
        private ICategory_Subcategory icategory;
        public Category_SubcategoryController(ICategory_Subcategory category)
        {
            icategory = category;
        }

        //---------------------------------------------------------------   CATEGORY   --------------------------------

        //Add Category

        [HttpPost]
        [Route("addCategory")]
        public async Task<IActionResult> addCategory([FromBody]CategoryModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.addCategory(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Display Category 

        [HttpGet]
        [Route("CategoryList")]
        public async Task<IActionResult> CategoryList()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var categoryList = await icategory.CategoryList();
                dctData.Add("CategoryList", categoryList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Update

        [HttpPut]
        [Route("updateCategory/{Cid}")]
        public async Task<IActionResult> updateCategory(int Cid, [FromBody]CategoryListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.updateCategory(Cid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Active Deactive Category

        [HttpPut]
        [Route("ChangeStatusCategory/{id}")]
        public async Task<IActionResult> changeStatusCategory(int id)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await icategory.ChangeStatusCategory(id);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        // Display Active Deactive Category List 

        [HttpGet]
        [Route("CategoryList_ActiveDeactive")]
        public async Task<IActionResult> CategoryList_ActiveDeactive()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try   
            {
                var categoryList = await icategory.CategoryList_ActiveDeactive();
                dctData.Add("CategoryList_ActiveDeactive", categoryList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }    
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Delete Category

        [HttpDelete]
        [Route("deleteCategory/{Cid}")]
        public async Task<IActionResult> deleteCategory(int Cid)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.deleteCategory(Cid);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //-----------------------------------------------------------------------------  SUBCATEGORY    -------------------------------------


        //Add Subcategory

        [HttpPost]
        [Route("addSubcategory")]
        public async Task<IActionResult> addSubcategory([FromBody]SubcategoryModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.addSubcategory(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Display Subcategory 

        [HttpGet]
        [Route("SubcategoryList/{cid}")]
        public async Task<IActionResult> SubcategoryList(int cid)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var subcategoryList = await icategory.SubcategoryList(cid);
                dctData.Add("SubcategoryList", subcategoryList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //View Subcategory

        [HttpGet]
        [Route("ViewSubcategoryList")]
        public async Task<IActionResult> ViewSubcategoryList()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var viewsubcategoryList = await icategory.ViewSubcategoryList();
                dctData.Add("ViewSubcategoryList", viewsubcategoryList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Update

        [HttpPut]
        [Route("updateSubcategory/{Sid}")]
        public async Task<IActionResult> updateSubcategory(int Sid, [FromBody]SubcategoryListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.updateSubcategory(Sid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Delete Subcategory

        [HttpDelete]
        [Route("deleteSubcategory/{Sid}")]
        public async Task<IActionResult> deleteSubcategory(int Sid)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.deleteSubcategory(Sid);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Active Deactive Subcategory

        [HttpPut]
        [Route("ChangeStatusSubcategory/{id}")]
        public async Task<IActionResult> ChangeStatusSubcategory(int id)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await icategory.ChangeStatusSubcategory(id);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        // Display Active Deactive Subategory List 

        [HttpGet]
        [Route("SubcategoryList_ActiveDeactive")]
        public async Task<IActionResult> SubcategoryList_ActiveDeactive()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var categoryList = await icategory.SubcategoryList_ActiveDeactive();
                dctData.Add("SubcategoryList_ActiveDeactive", categoryList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

    }
}
