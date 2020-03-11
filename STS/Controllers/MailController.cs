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

        public string Token;
        public int UserId;





        //[HttpPost]
        //[Route("SendMail")]
        //public async Task<IActionResult> SendMail([FromBody]EmailSettingsModel model)
        //{
        //    //await this.smtpClient.SendMailAsync( MailMessage(
        //    //    to: "tiwariakhil052@gmail.com",
        //    //    subject: "Test message subject",
        //    //    body: "Test message body"
        //    //    ));

        //    //return Ok("OK");
        //   CommonHelper.SendEmail(model);

        //}


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
                    var html = System.IO.File.ReadAllText(@"EmailTemplates/ResetPassword.html");
                    var link = "http://localhost:55627/admin/reset-password?Token=" + Token + "&UserId=" + UserId;
                    html = html.Replace("{{token}}", link);
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

    }


}
