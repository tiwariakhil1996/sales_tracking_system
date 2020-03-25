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
    public class ResetPasswordController : Controller
    {

        

        private IResetPassword iresetpassword;

        TranStatus transaction = new TranStatus();
        public ResetPasswordController(IResetPassword resetpassword)
        {
            iresetpassword = resetpassword;
        }

      
        //Reset Password Admin

        [HttpPut]
        [Route("ResetPasswordAdmin/{Token}")]
        public async Task<IActionResult> ResetPasswordAdmin(string Token, [FromBody]ResetPasswordAdminModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iresetpassword.ResetPasswordAdmin(Token, model);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Reset Password Sales
        [HttpPut]
        [Route("ResetPasswordSales/{Token}")]
        public async Task<IActionResult> ResetPasswordSales(string Token, [FromBody]ResetPasswordAdminModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iresetpassword.ResetPasswordSales(Token, model);

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
