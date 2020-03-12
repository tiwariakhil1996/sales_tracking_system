using STS.Common;
using STS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace STS.BLL.Interface
{
    public interface IActivity
    {
        //Insert
        Task<TranStatus> addActivity(ActivityModel model);

        //Task<Tuple<List<ActivityModel>, TranStatus>> addActivity(ActivityModel model);


        // Latest Added Activity
        //Task<List<ActivityModel>> addActivity();


        //Display Activity
        Task<List<ActivityListModel>> ActivityList();

        // Display Products Added into activity
        Task<List<Activity_ProductListModel>> Activity_ProductList(int aid);



        //Display ActivityList_while_adding
        Task<List<ActivityList_while_addingModel>> ActivityList_while_adding();


        // Display each sales List Individually
        //Task<List<ActivityListModel>> each_sales_activityList(ActivityListModel model);
        List<ActivityListModel> each_sales_activityList(ActivityListModel model, out int RowCount);



        // Display each admin List Individually
        //Task<List<admin_ActivityListModel>> each_admin_activityList(admin_ActivityListModel model);

        List<admin_ActivityListModel> each_admin_activityList(admin_ActivityListModel model, out int RowCount);

        List<admin_ActivityListModel> each_user_activityList(admin_ActivityListModel model, out int RowCount);


        // Display Sales lat lng ..whom admin has added
        Task<List<Sales_Location_Model>> each_admins_sales_Location(Sales_Location_Model model);

        // Count Assigned list on bell  notification 
        Task<List<newNotificationActivityLisModel>> assigned_activityList(newNotificationActivityLisModel model);

        Task<List<ActivityDetailsModel>> activity_Details(int aid);

        //Update Activity
        Task<TranStatus> updateActivity(int Aid, Update_ActivityModel model);


        //Update Products  added in activity
        Task<TranStatus> update_old_Products(int Aid, Update_products_in_ActivityModel model);


        //Update updateInprogress
        Task<TranStatus> updateInprogress(int Aid, ActivityListModel model);

        //Update updateToFollowup
        Task<TranStatus> updateToFollowup(int Aid, ActivityListModel model);

        //Update updateToClose
        Task<TranStatus> updateToClose(int Aid, ActivityListModel model);

        //Update updateToCancel
        Task<TranStatus> updateToCancel(int Aid, ActivityListModel model);

        //Delete Activity
        Task<TranStatus> deleteActivity(int Aid);

        //Delete
        Task<TranStatus> deleteActivity_Product(int productId);

        //Activity_History
        Task<TranStatus> activity_history(int Aid, ActivityListModel model);

        // Search Title
        //Task<TranStatus> searchTitle(string Title);
        Task<List<ActivityListModel>> searchTitle(int aid);

        //Task<List<ActivityListModel>> searchTitle(string Title);
        //Task<TranStatus> searchTitle(ActivityListModel model);


        // Activity Lat Long

        Task<List<Activity_Location_Model>> Activity_Location(int aid);
    }

}

