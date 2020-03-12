using STS.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Model
{

    public partial class ActivityModel
    {
        public int Aid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int SalesID { get; set; }
        public string ClientID { get; set; }

        public string Contact { get; set; }

        public string AppointmentDate { get; set; }
        public int Createdby { get; set; }

        public List<ProductListingModel> ProductList { get; set; }

    }

    public class ProductListingModel
    {

        public int ProductId { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }
        public int Discount_per { get; set; }
        public int Discount_amt { get; set; }
        public int Total_price { get; set; }
    }

    public partial class Update_ActivityModel
    {
        public int Aid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int SalesID { get; set; }
        public string ClientID { get; set; }

        public string Contact { get; set; }

        public string AppointmentDate { get; set; }
        public int Modifiedby { get; set; }

        public List<ProductListingModel> ProductList { get; set; }

    }

    public class Activity_ProductListModel
    {
        //public int Activity_Id { get; set; }
        public int Aid { get; set; }
        public int Order_Id { get; set; }
        public int ProductId { get; set; }
        public string Productname { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }
        public int Discount_per { get; set; }
        public int Discount_amt { get; set; }
        public int Total_price { get; set; }
    }
    public partial class ActivityListModel
    {
        public int Aid { get; set; }
        public int User_id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int ProductID { get; set; }
        public string Productname { get; set; }

        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }
        public int Discount_per { get; set; }
        public int Discount_amt { get; set; }
        public int Total_price { get; set; }
        public int SalesID { get; set; }
        public string SalesName { get; set; }
        public string ClientID { get; set; }
        public string ClientName { get; set; }

        public string Contact { get; set; }

        public string AppointmentDate { get; set; }
        public int Modifiedby { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public int userId { get; set; }
        public int status { get; set; }
        public string Statusname { get; set; }
        public string followup_description { get; set; }

        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int RowCount { get; set; }
        public string Search { get; set; }

        public string From_date { get; set; }
        public string To_date { get; set; }

    }

    public partial class Activity_Status_Model
    {
        public int Aid { get; set; }
        public int User_id { get; set; }

        public int Latitude { get; set; }
        public int Longitude { get; set; }

        public int userId { get; set; }
        public int status { get; set; }
        public string Statusname { get; set; }
        public string followup_description { get; set; }
    }

    public partial class ActivityList_while_addingModel
    {

        public string Image { get; set; }
        public string ImageExtn { get; set; }

        public int ProductID { get; set; }
        public string Productname { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }
        public int Discount_per { get; set; }
        public int Discount_amt { get; set; }
        public int Total_price { get; set; }

    }

    public partial class newNotificationActivityLisModel
    {
        public int Aid { get; set; }

        public int userId { get; set; }


    }

    public partial class LatestAddedActivityModel
    {
        public int Activity_Id { get; set; }

    }

    public partial class admin_ActivityListModel
    {
        public int Aid { get; set; }
        public int User_id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int ProductID { get; set; }
        public string Productname { get; set; }

        public int SalesID { get; set; }
        public string SalesName { get; set; }
        public string ClientID { get; set; }
        public string ClientName { get; set; }

        public string Contact { get; set; }


        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public string AppointmentDate { get; set; }
        public int Modifiedby { get; set; }

        public int userId { get; set; }
        public int status { get; set; }
        public string Statusname { get; set; }
        public string followup_description { get; set; }

        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int RowCount { get; set; }
        public string Search { get; set; }

        public string From_date { get; set; }
        public string To_date { get; set; }
    }

    public partial class Update_products_in_ActivityModel
    {
        public int Aid { get; set; }
        public int Order_Id { get; set; }

        public int ProductID { get; set; }
        public string Productname { get; set; }

        //public int Price { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }
        public int Discount_per { get; set; }
        public int Discount_amt { get; set; }
        public int Total_price { get; set; }
        public int Modifiedby { get; set; }


    }

    public partial class Activity_Location_Model
    {
        public int Aid { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }

    }

    public partial class Sales_Location_Model
    {
        public int UserId { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public string Image { get; set; }

    }


    public partial class ActivityDetailsModel
    {
        public int Aid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Createdon { get; set; }
        public string AppointmentDate { get; set; }
        public string ClientName { get; set; }
        public string Address { get; set; }
        //public string City { get; set; }
        //public string State { get; set; }
        //public string Country { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
  


    }
}
