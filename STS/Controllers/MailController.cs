using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using STS.BLL.Interface;
using STS.Common;
using STS.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;


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
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
          
            //var user = new ApplicationUser { UserName = model.UsernameEmail };
            try
            {

                CommonHelper.ResetPassword(
                     model.UsernameEmail,
                     Subject: "Sales Tracking System: Forgot Password",
                                       //EmailMessage: System.IO.File.ReadAllText(@"C:\sales_tracking_system\trainee_salestrackingsystem\STS\ClientApp\src\app\admin\reset-password-form\reset-password-form.component.html"),
                     EmailMessage: System.IO.File.ReadAllText(@"C:\Project\Asp.net\trainee_salestrackingsystem\STS\ClientApp\src\app\admin\reset-password-form\reset-password-form.component.html"),

                     needCC: true

                   )  ;
                var result = await imail.ResetPassword(model);
                //var result = await imail.ResetPassword(model);
                //dctData.Add("ResetPassword", result);

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
