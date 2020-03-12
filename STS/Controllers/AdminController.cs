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

        //public string emailsend(EmailClass ec)
        //{
        //    string To = ec.To;
        //    string body = ec.Body;
        //    string subject = ec.Subject;
        //    MailMessage mm = new MailMessage();
        //    mm.From = new MailAddress("tiwariakhil052@gmail.com");
        //    mm.Subject = subject;
        //    mm.Body = body;
        //    mm.To.Add(To);
        //    mm.IsBodyHtml = false;

        //    SmtpClient smtp = new SmtpClient("smtp.gmail.com");
        //    smtp.Port = 587;
        //    smtp.UseDefaultCredentials = true;
        //    smtp.EnableSsl = true;
        //    smtp.Credentials = new System.Net.NetworkCredential("tiwariakhil052@gmail.com", "password");
        //    smtp.Send(mm);
        //    return "The mail has been send to " + ec.To.ToString();
        //}

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
                model.Image = CommonHelper.SaveImage(HttpContext, "Avatars\\Admin", model.Image, true, model.ImageExtn);

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


        //Change Passsword

        [HttpPut]
        [Route("changeadminPassword/{Id}")]
        public async Task<IActionResult> changeadminPassword(int Id, [FromBody]Changeadmin_passwordModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iadmin.changeadminPassword(Id, model);

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
