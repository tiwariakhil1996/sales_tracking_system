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
    public class DemoController : Controller
    {
        private IDemo idemo;
        public DemoController(IDemo demo)
        {
            idemo = demo;
        }

        //Add Demo

        [HttpPost]
        [Route("AddDemo")]
        public async Task<IActionResult> AddDemo([FromBody]DemoModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await idemo.AddDemo(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        ////View Products

        //[HttpGet]
        //[Route("ProductList")]
        //public async Task<IActionResult> ProductList()
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var productList = await iproduct.ProductList();
        //        dctData.Add("ProductList", productList);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}

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
