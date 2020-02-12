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
    public class AdminController : Controller
    {
        private IAdmin iadmin;

       TranStatus transaction = new TranStatus();
            public AdminController(IAdmin admin)
        {
            iadmin = admin;
        }

        //Register

        [HttpPost]
        [Route("AdminRegister")]
        public async Task<IActionResult> AdminRegister([FromBody] AdminRegisterModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iadmin.AdminRegister(model);

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
        //[Route("AdminLogin")]
        //public async Task<IActionResult> AdminLogin([FromBody] AdminLoginModel model)
        //{
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    TranStatus transaction = new TranStatus();
        //    try
        //    {

        //        transaction = await iadmin.AdminLogin(model);

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
        [Route("AdminLogin")]
        public async Task<IActionResult> AdminLogin([FromBody]AdminLoginModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var result = await iadmin.AdminLogin(model);
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



        //UpdateAdminProfile
        [HttpPost]
        [Route("updateAdminProfile")]
        public async Task<IActionResult> updateAdminProfile([FromBody]updateProfileModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                //model.Image = CommonHelper.SaveImage(HttpContext, "Images\\AdminProfile", model.Image, true, model.ImageExtn);
                model.Image = CommonHelper.SaveImage(HttpContext, "avatars", model.Image, true, model.ImageExtn);

                //transaction = await iadmin.updateAdminProfile(model);

                var result = await iadmin.updateAdminProfile(model);
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

        // Display

        //[HttpGet]
        //[Route("AdminLogin")]
        //public async Task<IActionResult> AdminLogin()
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var adminLogin = await iadmin.AdminLogin();
        //        dctData.Add("AdminLogin", adminLogin);
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
