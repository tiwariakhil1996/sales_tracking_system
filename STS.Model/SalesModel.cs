namespace STS.Model
{
    //Register
    public partial class SalesModel
    {
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Cpassword { get; set; }
        public int Createdby { get; set; }

    }


    //Login
    public partial class SalesLoginModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string SalesName { get; set; }

        public string Gender { get; set; }
        public string Mobile { get; set; }
        public string Adharcard { get; set; }
        public string Companyname { get; set; }
        public string Companyaddress { get; set; }
        public string Address { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int UserType { get; set; }

    }

    //Change Password
    public partial class ChangepasswordModel
    {
        //public int Id { get; set; }

        public string Oldpassword { get; set; }
        public string Newpassword { get; set; }
        public string Confirmpassword { get; set; }

    }

    public class updateSalesModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Mobile { get; set; }
        public string Adharcard { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }

        public int UserType { get; set; }
    }

    //Display
    public partial class SalesListModel
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string ImageExtn { get; set; }
        public string SalesName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Adharcard { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public int UserId { get; set; }


        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int RowCount { get; set; }
        public string Search { get; set; }
    }

    public partial class Refresh_Sales_Location_Model
    {
        public int UserId { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

    }

    public partial class SalesList_DropdownModel
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public string SalesName { get; set; }
    }

}
