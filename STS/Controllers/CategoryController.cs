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
    public class CategoryController : Controller
    {
        private ICategory icategory;
        public CategoryController(ICategory category)
        {
            icategory = category;
        }

        //Add Category

        [HttpPost]
        [Route("AddCategory")]
        public async Task<IActionResult> AddCategory([FromBody]CategoryModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await icategory.AddCategory(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        // View Category

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

        //[HttpPut]
        //[Route("updateProduct/{ID}")]
        //public async Task<IActionResult> updateProduct(int ID , [FromBody]ProductListModel model)
        //{
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    TranStatus transaction = new TranStatus();
        //    try
        //    {

        //        transaction = await iproduct.updateProduct(ID,model);

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}


        ////Delete
        //[HttpDelete]
        //[Route("deleteProduct/{ID}")]
        //public async Task<IActionResult> deleteProduct(int ID)
        //{
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    TranStatus transaction = new TranStatus();
        //    try
        //    {

        //        transaction = await iproduct.deleteProduct(ID);

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}

    }
}
