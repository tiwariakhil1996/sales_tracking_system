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
    public class MailController : Controller
    {
        private IMail imail;
        public MailController(IMail mail)
        {

            imail = mail;
        }


        TranStatus transaction = new TranStatus();

        //Passed the Token and user id in urr.this is declare the token and userid variable as public 
        public string Token;
        public int UserId;

        // Send mail Admin with token  and user id
        [HttpPost]
        [Route("SendMail")]
        public async Task<IActionResult> SendMail([FromBody] SendMailModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await imail.SendMail(model);
                if (transaction.code == 0)
                {
                    Token = transaction.Token;
                    UserId = transaction.UserIdentity;
                    //Users = transaction.Users;
                    var html = System.IO.File.ReadAllText(@"EmailTemplates/ResetPassword.html");
                    var link = "http://localhost:55627/admin/reset-password?Token=" + Token + "&UserId=" + UserId;
                    html = html.Replace("{{token}}", link);
                    //var user = Users;
                    //user = user.Replace("{{users}}", link);
                    CommonHelper.SendEmail(
                        model.UsernameEmail,
                         Subject: "Sales Tracking System-Forgot Password",
                         EmailMessage: html,
                           needCC: true
                       );
                }
                dctData.Add("SendMail", transaction);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        // Send mail sales with token  and user id
        [HttpPost]
        [Route("SendMail_Sales")]
        public async Task<IActionResult> SendMail_Sales([FromBody] SendMailModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await imail.SendMail_Sales(model);
                if (transaction.code == 0)
                {
                    Token = transaction.Token;
                    UserId = transaction.UserIdentity;

                    var html = System.IO.File.ReadAllText(@"EmailTemplate/ResetPassword.html");
                    var link = "http://localhost:55627/sales/reset-password-sales?Token=" + Token + "&UserId=" + UserId;


                    html = html.Replace("{{token}}", link);
                    //var user = Users;
                    //user = user.Replace("{{users}}", link);
                    CommonHelper.SendEmail(
                        model.UsernameEmail,
                         Subject: "Sales Tracking System-Forgot Password",
                         EmailMessage: html,
                           needCC: true
                       );
                }
                dctData.Add("SendMail_Sales", transaction);
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
