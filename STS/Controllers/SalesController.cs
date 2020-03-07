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

                //model.Image = CommonHelper.SaveImage(HttpContext, "Images\\SalesProfile", model.Image, true, model.ImageExtn);
                model.Image = CommonHelper.SaveImage(HttpContext, "Avatars\\Sales", model.Image, true, model.ImageExtn);
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




        //Change Passsword

        [HttpPut]
        [Route("changesalesPassword/{Id}")]
        public async Task<IActionResult> changesalesPassword(int Id, [FromBody]ChangepasswordModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await isales.changesalesPassword(Id, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Change Status 

        [HttpPut]
        [Route("ChangeStatusSales/{id}")]
        public async Task<IActionResult> ChangeStatusSales(int id)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await isales.ChangeStatusSales(id);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Display Active Deactive Sales List 

        [HttpGet]
        [Route("SalesList_ActiveDeactive")]
        public async Task<IActionResult> SalesList_ActiveDeactive()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var registerList = await isales.SalesList_ActiveDeactive();
                dctData.Add("SalesList_ActiveDeactive", registerList);
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





        // Display by createdby which admin
        //[HttpPost]
        //[Route("RegisteredSalesList")]
        //public async Task<IActionResult> RegisteredSalesList([FromBody]SalesListModel model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var registerList = await isales.RegisteredSalesList(model);
        //        dctData.Add("RegisteredSalesList", registerList);
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
        [Route("RegisteredSalesList")]
        public IActionResult RegisteredSalesList([FromBody]SalesListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<SalesListModel> RegisteredSalesList = new List<SalesListModel>();
                int rowcount = 0;
                RegisteredSalesList = isales.RegisteredSalesList(model, out rowcount);
                dctData.Add("RegisteredSalesList", RegisteredSalesList);
                dctData.Add("RowCount", rowcount);
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


        //[HttpPost]
        //[Route("Refresh_Sales_Location")]
        //public async Task<IActionResult> Refresh_Sales_Location(Refresh_Sales_Location_Model model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var registerList = await isales.Refresh_Sales_Location(model);
        //        dctData.Add("Refresh_Sales_Location", registerList);
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
        [Route("Refresh_Sales_Location")]
        public async Task<IActionResult> Refresh_Sales_Location([FromBody]Refresh_Sales_Location_Model model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await isales.Refresh_Sales_Location(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Sales List in Dropdown
        [HttpPost]
        [Route("SalesList_dropdown")]
        public async Task<IActionResult> SalesList_dropdown([FromBody]SalesList_DropdownModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var registerList = await isales.SalesList_dropdown(model);
                dctData.Add("SalesList_dropdown", registerList);
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
