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

        //Display
        Task<List<ActivityListModel>> ActivityList();


        // Display each sales List Individually
        Task<List<ActivityListModel>> each_sales_activityList(ActivityListModel model);

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


        ////Change Status Activity InProgress
        //Task<TranStatus> ChangeStatusActivity_Inprogress(int aid);

        ////Change Status Activity Followup
        //Task<TranStatus> ChangeStatusActivity_Followup(int aid);

        ////Change Status Activity Close
        //Task<TranStatus> ChangeStatusActivity_Close(int aid);
    }

}

