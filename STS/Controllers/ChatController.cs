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
    public class ChatController : Controller
    {
        private IChat ichat;

        TranStatus transaction = new TranStatus();
        public ChatController(IChat chat)
        {
            ichat = chat;
        }


        [HttpPost]
        [Route("sendmessage")]
        public async Task<IActionResult> sendmessage([FromBody] ChatModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await ichat.sendmessage(model);

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
        [Route("getchats")]
        public IActionResult getchats([FromBody]ChatModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<ChatModel> getchatLists = new List<ChatModel>();
                getchatLists = ichat.getchats(model);

                dctData.Add("getchats", getchatLists);
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
        [Route("unread_messages")]
        public IActionResult unread_messages([FromBody]ChatModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<ChatModel> getchatLists = new List<ChatModel>();
                getchatLists = ichat.unread_messages(model);

                dctData.Add("unread_messages", getchatLists);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Delete
        //[HttpDelete]
        //[Route("deleteMsg/{ID}")]
        //public async Task<IActionResult> deleteMsg(int ID, ChatModel model)
        //{
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    TranStatus transaction = new TranStatus();
        //    try
        //    {

        //        transaction = await ichat.deleteMsg(ID,model);

        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}

        [HttpPut]
        [Route("deleteMsg/{ID}")]
        public async Task<IActionResult> deleteMsg(int ID, [FromBody]ChatModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await ichat.deleteMsg(ID, model);

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
