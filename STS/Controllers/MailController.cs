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
        public async Task<IActionResult> ResetPassword([FromBody] SendMailModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                CommonHelper.SendEmail(
                     model.UsernameEmail,
                     Subject: "Sales Tracking System: Forgot Password",
                     //EmailMessage: "Hi He/she " + "we've received a request for password change for your STS account. If this was you click on the link below to reset your password:" +
                     //" http://localhost:55627/admin/reset-password " +

                     //"If you didn't request a reset or don't want to change your password just ignore this message and delete it. " +
                     //"If you suspect that your account may be compromised please contact us." +
                     //"Happy Sales Tracking System",
                     EmailMessage: System.IO.File.ReadAllText(@"C:\sales_tracking_system\trainee_salestrackingsystem\STS\ClientApp\src\app\admin\reset-password-form\reset-password-form.component.html"),
                     needCC: true

                   );;
                transaction = await imail.ResetPassword(model);




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
