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


        //Delete
        Task<TranStatus> deleteActivity(int Aid);

        //Change Status InProgress
        Task<TranStatus> ChangeStatusInProgress(int id);
    }
}

