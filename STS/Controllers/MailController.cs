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

                CommonHelper.SendEmail(
                     model.UsernameEmail,
                     Subject: "Sales Tracking System: Forgot Password",
                     //EmailMessage: System.IO.File.ReadAllText(@"C:\sales_tracking_system\trainee_salestrackingsystem\STS\ClientApp\src\app\admin\reset-password-form\reset-password-form.component.html"),
                     //EmailMessage: System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("EmailTemplates/ResetPassword.html")),
                        EmailMessage: System.IO.File.ReadAllText(@"EmailTemplates\ResetPassword.html"),


                    //var EResetPasswordlink = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host.Host + STSSetting.Subdirectory + "/admin/reset-password/" + "emailresetpassword?email=" + CommonHelper.Encrypt(model["UsernameEmail"].ToString()),
                    needCC: true

                   ); ;
                transaction = await imail.SendMail(model);


                    

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
