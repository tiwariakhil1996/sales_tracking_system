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
    public class SalesController : Controller
    {

        TranStatus transaction = new TranStatus();

        private ISales isales;
        public SalesController(ISales sales)
        {
            isales = sales;
        }

        //Sales Register

        [HttpPost]
        [Route("RegisterSales")]
        public async Task<IActionResult> RegisterSales([FromBody]SalesModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await isales.RegisterSales(model);

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

        //[HttpPost]
        //[Route("SalesLogin")]
        //public async Task<IActionResult> SalesLogin([FromBody] SalesLoginModel model)
        //{
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    TranStatus transaction = new TranStatus();
        //    try
        //    {

        //        transaction = await isales.SalesLogin(model);

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}



        [HttpPost]
        [Route("SalesLogin")]
        public async Task<IActionResult> SalesLogin([FromBody]SalesLoginModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var result = await isales.SalesLogin(model);
                var loginDetail = result.Item1;
                transaction = result.Item2;
                dctData.Add("loginDetail", loginDetail);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //UpdateSalesProfile
        [HttpPost]
        [Route("updateSalesProfile")]
        public async Task<IActionResult> updateSalesProfile([FromBody]updateSalesModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                model.Image = CommonHelper.SaveImage(HttpContext, "Images\\SalesProfile", model.Image, true, model.ImageExtn);
                //transaction = await isales.updateSalesProfile(model);

                var result = await isales.updateSalesProfile(model);
                var loginDetail = result.Item1;
                transaction = result.Item2;
                dctData.Add("loginDetail", loginDetail);
               
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);

        }
        //Display

        [HttpGet]
        [Route("RegisteredSalesList")]
        public async Task<IActionResult> RegisteredSalesList()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var registerList = await isales.RegisteredSalesList();
                dctData.Add("RegisteredSalesList", registerList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Delete
        [HttpDelete]
        [Route("deleteSales/{ID}")]
        public async Task<IActionResult> deleteSales(int ID)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await isales.deleteSales(ID);

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
