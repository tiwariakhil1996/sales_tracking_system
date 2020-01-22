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
    public class ProductController : Controller
    {
        private IProduct iproduct;
        public ProductController(IProduct product)
        {
            iproduct = product;
        }

        //Add Product

        [HttpPost]
        [Route("addProduct")]
        public async Task<IActionResult> addProduct([FromBody]ProductModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iproduct.addProduct(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Login

        //[HttpGet]
        //[Route("RegisterList")]
        //public async Task<IActionResult> RegisterList()
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var signupList = await iuser.RegisterList();
        //        dctData.Add("RegisterList", signupList);
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
