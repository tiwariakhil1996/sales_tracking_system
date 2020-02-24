using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IActivity
    {
        //Insert
        Task<TranStatus> addActivity(ActivityModel model);

        //Task<Tuple<List<ActivityModel>, TranStatus>> addActivity(ActivityModel model);


        // Latest Added Activity
        //Task<List<LatestAddedActivityModel>> addActivity();


        //Display
        Task<List<ActivityListModel>> ActivityList();


        //Display ActivityList_while_adding
        Task<List<ActivityList_while_addingModel>> ActivityList_while_adding();


        // Display each sales List Individually
        Task<List<ActivityListModel>> each_sales_activityList(ActivityListModel model);


        // Display each admin List Individually
        Task<List<admin_ActivityListModel>> each_admin_activityList(admin_ActivityListModel model);

        // Count Assigned list on bell  notification 
        Task<List<newNotificationActivityLisModel>> assigned_activityList(newNotificationActivityLisModel model);

        //Update
        Task<TranStatus> updateActivity(int Aid, ActivityListModel model);

       


        //Update updateInprogress
        Task<TranStatus> updateInprogress(int Aid, ActivityListModel model);

        //Update updateToFollowup
        Task<TranStatus> updateToFollowup(int Aid, ActivityListModel model);

        //Update updateToClose
        Task<TranStatus> updateToClose(int Aid, ActivityListModel model);

        //Update updateToCancel
        Task<TranStatus> updateToCancel(int Aid, ActivityListModel model);

        //Delete
        Task<TranStatus> deleteActivity(int Aid);

        //Activity_History
        Task<TranStatus> activity_history(int Aid, ActivityListModel model);

    }

}

