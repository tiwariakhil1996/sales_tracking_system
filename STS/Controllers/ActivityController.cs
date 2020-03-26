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
    public class ActivityController : Controller
    {
        private IActivity iactivity;

        TranStatus transaction = new TranStatus();
        public ActivityController(IActivity activity)
        {
            iactivity = activity;
        }
        //Add Activity
        [HttpPost]
        [Route("addActivity")]
        public async Task<IActionResult> addActivity([FromBody]ActivityModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.addActivity(model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Display Actitivity

        [HttpGet]
        [Route("ActivityList")]
        public async Task<IActionResult> ActivityList()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var activityList = await iactivity.ActivityList();
                dctData.Add("ActivityList", activityList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }
        // Display Products Added into activity
        [HttpGet]
        [Route("Activity_ProductList/{aid}")]
        public async Task<IActionResult> Activity_ProductList(int aid)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var activityList = await iactivity.Activity_ProductList(aid);
                dctData.Add("Activity_ProductList", activityList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }
        [HttpGet]
        [Route("activity_Details/{aid}")]
        public async Task<IActionResult> activity_Details(int aid)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var activityList = await iactivity.activity_Details(aid);
                dctData.Add("activity_Details", activityList);
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

        //[HttpGet]
        //[Route("ActivityList_while_adding")]
        //public async Task<IActionResult> ActivityList_while_adding()
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var activityList = await iactivity.ActivityList_while_adding();
        //        dctData.Add("ActivityList_while_adding", activityList);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}




        // Display each sales List Individually
        //[HttpPost]
        //[Route("each_sales_activityList")]
        //public async Task<IActionResult> each_sales_activityList([FromBody]ActivityListModel model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var activityList = await iactivity.each_sales_activityList(model);
        //        dctData.Add("each_sales_activityList", activityList);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}

        // Display each admin List Individually
        //[HttpPost]
        //[Route("each_admin_activityList")]
        //public async Task<IActionResult> each_admin_activityList([FromBody]admin_ActivityListModel model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var activityList = await iactivity.each_admin_activityList(model);
        //        dctData.Add("each_admin_activityList", activityList);
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
        [Route("each_admin_activityList")]
        public IActionResult each_admin_activityList([FromBody]admin_ActivityListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<admin_ActivityListModel> each_admin_activityList = new List<admin_ActivityListModel>();
                int rowcount = 0;
                each_admin_activityList = iactivity.each_admin_activityList(model, out rowcount);

                dctData.Add("each_admin_activityList", each_admin_activityList);
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

        [HttpPost]
        [Route("each_sales_activityList")]
        public IActionResult each_sales_activityList([FromBody]ActivityListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<ActivityListModel> each_sales_activityList = new List<ActivityListModel>();
                int rowcount = 0;
                each_sales_activityList = iactivity.each_sales_activityList(model, out rowcount);

                dctData.Add("each_sales_activityList", each_sales_activityList);
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



        [HttpPost]
        [Route("each_user_activityList")]
        public IActionResult each_user_activityList([FromBody]admin_ActivityListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<admin_ActivityListModel> each_user_activityList = new List<admin_ActivityListModel>();
                int rowcount = 0;
                each_user_activityList = iactivity.each_user_activityList(model, out rowcount);

                dctData.Add("each_user_activityList", each_user_activityList);
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


  

        // Display Sales lat lng ..whom admin has added

        [HttpPost]
        [Route("each_admins_sales_Location")]
        public async Task<IActionResult> each_admins_sales_Location([FromBody]Sales_Location_Model model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var activityList = await iactivity.each_admins_sales_Location(model);
                dctData.Add("each_admins_sales_Location", activityList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        // Count Assigned list on bell  notification 
        [HttpPost]
        [Route("assigned_activityList")]
        public async Task<IActionResult> assigned_activityList([FromBody]newNotificationActivityLisModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var activityList = await iactivity.assigned_activityList(model);
                dctData.Add("assigned_activityList", activityList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Update Activity

        [HttpPut]
        [Route("updateActivity/{Aid}")]
        public async Task<IActionResult> updateActivity(int Aid, [FromBody]Update_ActivityModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.updateActivity(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }



        [HttpPut]
        [Route("update_n_addProducts/{Aid}")]
        public async Task<IActionResult> update_n_addProducts(int Aid, [FromBody]Update_ActivityModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.update_n_addProducts(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Update Product added in activity

        [HttpPut]
        [Route("update_old_Products/{Aid}")]
        public async Task<IActionResult> update_old_Products(int Aid, [FromBody]Update_products_in_ActivityModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.update_old_Products(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Update updateInprogress

        [HttpPut]
        [Route("updateInprogress/{Aid}")]
        public async Task<IActionResult> updateInprogress(int Aid, [FromBody]ActivityListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.updateInprogress(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Update updateToFollowup

        [HttpPut]
        [Route("updateToFollowup/{Aid}")]
        public async Task<IActionResult> updateToFollowup(int Aid, [FromBody]ActivityListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.updateToFollowup(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        [HttpPut]
        [Route("updateToPending/{Aid}")]
        public async Task<IActionResult> updateToPending(int Aid, [FromBody]ActivityListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.updateToPending(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Update updateToClose

        [HttpPut]
        [Route("updateToClose/{Aid}")]
        public async Task<IActionResult> updateToClose(int Aid, [FromBody]ActivityListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.updateToClose(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Update updateToCancel

        [HttpPut]
        [Route("updateToCancel/{Aid}")]
        public async Task<IActionResult> updateToCancel(int Aid, [FromBody]ActivityListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.updateToCancel(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Delete Activity
        [HttpDelete]
        [Route("deleteActivity/{Aid}")]
        public async Task<IActionResult> deleteActivity(int AID)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.deleteActivity(AID);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Delete Activity Product
        [HttpDelete]
        [Route("deleteActivity_Product/{productId}")]
        public async Task<IActionResult> deleteActivity_Product(int productId)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.deleteActivity_Product(productId);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }



        //Activity_History

        [HttpPut]
        [Route("activity_history/{Aid}")]
        public async Task<IActionResult> activity_history(int Aid, [FromBody]ActivityListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iactivity.activity_history(Aid, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Search Title
        //[HttpGet]
        //[Route("searchTitle/{aid}")]
        //public async Task<IActionResult> searchTitle(int aid)
        //{
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    TranStatus transaction = new TranStatus();
        //    try
        //    {

        //        var activityList = await iactivity.searchTitle(aid);
        //        dctData.Add("searchTitle", activityList);

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}



        //[HttpGet]
        //[Route("searchTitle")]
        //public async Task<IActionResult> searchTitle([FromBody]ActivityListModel model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var activityList = await iactivity.searchTitle(model);
        //        dctData.Add("searchTitle", activityList);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}


        // Activity Lat Long
        [HttpGet]
        [Route("Activity_Location/{aid}")]
        public async Task<IActionResult> Activity_Location(int aid)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var activityList = await iactivity.Activity_Location(aid);
                dctData.Add("Activity_Location", activityList);
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
