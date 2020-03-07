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
    public class ResetPasswordController : Controller
    {

        

        private IResetPassword iresetpassword;

        TranStatus transaction = new TranStatus();
        public ResetPasswordController(IResetPassword resetpassword)
        {
            iresetpassword = resetpassword;
        }

      
        //Resert Password Passsword

        [HttpPut]
        [Route("ResetPasswordAdmin/{ResetPassword_id}")]
        public async Task<IActionResult> ResetPasswordAdmin(int ResetPassword_id, [FromBody]ResetPasswordAdminModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iresetpassword.ResetPasswordAdmin(ResetPassword_id, model);

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
