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
        //private SmtpClient smtpClient;
        //public MailController(SmtpClient smtpClient)
        //{
        //    this.smtpClient = smtpClient;
        //}

        //[HttpPost]
        //[Route("SendMail")]
        //public async Task<IActionResult> Post()
        //{
        //        await this.smtpClient.SendMailAsync(new MailMessage(
        //            to: "tiwariakhil052@gmail.com",
        //            subject: "Test message subject",
        //            body: "Test message body"
        //            ));

        //        return Ok("OK");
            

        //}

        //protected override void Dispose(bool disposing)
        //{
        //    this.smtpClient.Dispose();
        //    base.Dispose(disposing);
        //}
    }
}
