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
    public class Country_State_CityController : Controller
    {
        private ICountry_State_City icountry;
        public Country_State_CityController(ICountry_State_City country)
        {
            icountry = country;
        }


        //Display Country

        [HttpGet]
        [Route("CountryList")]
        public async Task<IActionResult> CountryList()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var countryList = await icountry.CountryList();
                dctData.Add("CountryList", countryList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        [HttpGet]
        [Route("StateList/{cid}")]
        public async Task<IActionResult> StateList(int cid)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var stateList = await icountry.StateList(cid);
                dctData.Add("StateList", stateList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        [HttpGet]
        [Route("CityList/{sid}")]
        public async Task<IActionResult> CityList(int sid)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var cityList = await icountry.CityList(sid);
                dctData.Add("CityList", cityList);
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
