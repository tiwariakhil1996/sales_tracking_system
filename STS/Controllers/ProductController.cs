﻿using System;
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
    public class ProductController : Controller
    {
        private IProduct iproduct;
        public ProductController(IProduct product)
        {
            iproduct = product;
        }

        //Add Product

        [HttpPost]
        [Route("addProduct")]
        public async Task<IActionResult> addProduct([FromBody]ProductModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            //try
            //{

            //    model.Image = CommonHelper.SaveImage(HttpContext, "Images\\Product", model.Image, true, model.ImageExtn);
            //    transaction = await iproduct.addProduct(model);

            //}

            try
            {
                //This for loop for adding the multiple Image
                for (var i = 0; i < model.ImageList.Count; i++)
                {
                    model.ImageListData[i].Image = CommonHelper.SaveImage(HttpContext, "Images\\Product", model.ImageList[i].ImageData, true, model.ImageList[i].ImageExtn);
                }
                transaction = await iproduct.addProduct(model);
            }

            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        // Get Product Price

        [HttpGet]
        [Route("ProductPrice/{id}")]
        public async Task<IActionResult> ProductPrice(int id)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var productPrice = await iproduct.ProductPrice(id);
                dctData.Add("ProductPrice", productPrice);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }



        //View Products

        [HttpGet]
        [Route("ProductList")]
        public async Task<IActionResult> ProductList()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var productList = await iproduct.ProductList();
                dctData.Add("ProductList", productList);
                //List<ProductListModel> ProductList = new List<ProductListModel>();
                //List<GetProductImageListModel> ImageList = new List<GetProductImageListModel>();
                //var result = await iproduct.ProductList(model);
                //ProductList = result.Item1;
                //ImageList = result.Item2;

                //dctData.Add("ProductList", ProductList);
                //dctData.Add("ImageList", ImageList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        // Display each admin List Individually
        //[HttpPost]
        //[Route("each_admin_ProductList")]
        //public async Task<IActionResult> each_admin_ProductList([FromBody]ProductListModel model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var productList = await iproduct.each_admin_ProductList(model);
        //        dctData.Add("each_admin_ProductList", productList);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        //}


        [HttpPost]
        [Route("each_admin_ProductList")]
        public IActionResult each_admin_ProductList([FromBody]ProductListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<ProductListModel> each_admin_ProductList = new List<ProductListModel>();
                int rowcount = 0;
                each_admin_ProductList = iproduct.each_admin_ProductList(model, out rowcount);
                dctData.Add("each_admin_ProductList", each_admin_ProductList);
                dctData.Add("RowCount", rowcount);

                //var clientList = await iclient.each_admin_ClientList(model);
                //dctData.Add("each_admin_ClientList", clientList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Multiple Image Display
        [HttpGet]
        [Route("Product_Images_List/{id}")]
        public async Task<IActionResult> Product_Images_List(int id)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var productList = await iproduct.Product_Images_List(id);
                dctData.Add("Product_Images_List", productList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }
        //Delete Multiple Image
        [HttpDelete]
        [Route("DeleteImage/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iproduct.DeleteImage(id);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        // Display each sales List Individually
        //[HttpPost]
        //[Route("each_sales_ProductList")]
        //public async Task<IActionResult> each_sales_ProductList([FromBody]ProductListModel model)
        //{
        //    TranStatus transaction = new TranStatus();
        //    Dictionary<String, Object> dctData = new Dictionary<string, object>();
        //    HttpStatusCode statusCode = HttpStatusCode.OK;
        //    try
        //    {
        //        var productList = await iproduct.each_sales_ProductList(model);
        //        dctData.Add("each_sales_ProductList", productList);
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction = CommonHelper.TransactionErrorHandler(ex);
        //        statusCode = HttpStatusCode.BadRequest;
        //    }
        //    dctData.Add("Status", transaction);
        //    return this.StatusCode(Convert.ToInt32(statusCode), dctData);

        //}

        [HttpPost]
        [Route("each_sales_ProductList")]
        public IActionResult each_sales_ProductList([FromBody]ProductListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<ProductListModel> each_sales_ProductList = new List<ProductListModel>();
                int rowcount = 0;
                each_sales_ProductList = iproduct.each_sales_ProductList(model, out rowcount);
                dctData.Add("each_sales_ProductList", each_sales_ProductList);
                dctData.Add("RowCount", rowcount);

                //var clientList = await iclient.each_admin_ClientList(model);
                //dctData.Add("each_admin_ClientList", clientList);
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
        [Route("each_user_ProductList")]
        public IActionResult each_user_ProductList([FromBody]ProductListModel model)
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                List<ProductListModel> each_user_ProductList = new List<ProductListModel>();
                int rowcount = 0;
                each_user_ProductList = iproduct.each_user_ProductList(model, out rowcount);
                dctData.Add("each_user_ProductList", each_user_ProductList);
                dctData.Add("RowCount", rowcount);

                //var clientList = await iclient.each_admin_ClientList(model);
                //dctData.Add("each_admin_ClientList", clientList);
            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }
        //Update

        [HttpPut]
        [Route("updateProduct/{ID}")]
        public async Task<IActionResult> updateProduct(int ID, [FromBody]ProductListModel model)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            //try
            //{
            //    model.Image = CommonHelper.SaveImage(HttpContext, "Images\\Product", model.Image, true, model.ImageExtn);
            //    transaction = await iproduct.updateProduct(ID, model);

            //}

            try
            {
                //This for loop for adding the multiple Image


                for (var i = 0; i < model.ImageList.Count; i++)
                {
                    model.ImageListData[i].Image = CommonHelper.SaveImage(HttpContext, "Images\\Product", model.ImageList[i].ImageData, true, model.ImageList[i].ImageExtn);
                }
                transaction = await iproduct.updateProduct(ID,model);
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
        [HttpDelete]
        [Route("deleteProduct/{ID}")]
        public async Task<IActionResult> deleteProduct(int ID)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {

                transaction = await iproduct.deleteProduct(ID);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }

        //Change Status 

        [HttpPut]
        [Route("ChangeStatusProduct/{id}")]
        public async Task<IActionResult> ChangeStatusProduct(int id)
        {
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            TranStatus transaction = new TranStatus();
            try
            {
                transaction = await iproduct.ChangeStatusProduct(id);

            }
            catch (Exception ex)
            {
                transaction = CommonHelper.TransactionErrorHandler(ex);
                statusCode = HttpStatusCode.BadRequest;
            }
            dctData.Add("Status", transaction);
            return this.StatusCode(Convert.ToInt32(statusCode), dctData);
        }


        //Display Active Deactive Product List 

        [HttpGet]
        [Route("ProductList_ActiveDeactive")]
        public async Task<IActionResult> ProductList_ActiveDeactive()
        {
            TranStatus transaction = new TranStatus();
            Dictionary<String, Object> dctData = new Dictionary<string, object>();
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var productList = await iproduct.ProductList_ActiveDeactive();
                dctData.Add("ProductList_ActiveDeactive", productList);
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
