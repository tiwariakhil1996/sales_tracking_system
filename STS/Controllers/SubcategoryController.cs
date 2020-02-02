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
    public class SubcategoryController : Controller
    {
        private ISubcategory isubcategory;
        public SubcategoryController(ISubcategory subcategory)
        {
            isubcategory = subcategory;
        }

        //Add Subcategory

        [HttpPost]
        [Route("AddSubcategory")]
        public async Task<IActionResult> AddSubcategory([FromBody]SubcategoryModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await isubcategory.AddSubcategory(model);

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
        [Route("SubcategoryList/{id}")]
        public async Task<IActionResult> SubcategoryList(int id)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var subcategoryList = await isubcategory.SubcategoryList(id);
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

        ////Update

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
