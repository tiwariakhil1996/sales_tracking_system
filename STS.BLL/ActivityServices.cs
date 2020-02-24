using STS.Common;
using STS.DAL;
using STS.Model;
using System;
using System.Collections.Generic;
using System.Text;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class ActivityServices : IActivity

    {
        ActivityRepository activityRepository = null;

        //Insert
        public Task<TranStatus> addActivity(ActivityModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return activityRepository.addActivity(model);

            }
        }

        //public Task<Tuple<List<ActivityModel>, TranStatus>> addActivity(ActivityModel model)
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return activityRepository.addActivity(model);
        //    }
        //}


        // Latest Added Activity
        public async Task<List<ActivityModel>> addActivity()
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.addActivity();
            }
        }

        //Display Activity
        public async Task<List<ActivityListModel>> ActivityList()
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.ActivityList();
            }
        }

        // Display Products Added into activity
        public async Task<List<Activity_ProductListModel>> Activity_ProductList(int aid)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.Activity_ProductList(aid);
            }
        }


        //Display
        public async Task<List<ActivityList_while_addingModel>> ActivityList_while_adding()
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.ActivityList_while_adding();
            }
        }


        // Display each sales List Individually
        public async Task<List<ActivityListModel>> each_sales_activityList(ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.each_sales_activityList(model);
            }
        }

        // Display each admin List Individually
        public async Task<List<admin_ActivityListModel>> each_admin_activityList(admin_ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.each_admin_activityList(model);
            }

        }
        // Count Assigned list on bell  notification 
        public async Task<List<newNotificationActivityLisModel>> assigned_activityList(newNotificationActivityLisModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.assigned_activityList(model);
            }
        }


        //Update
        public async Task<TranStatus> updateActivity(int Aid, ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.updateActivity(Aid, model);
            }
        }



        //Update updateInprogress
        public async Task<TranStatus> updateInprogress(int Aid, ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.updateInprogress(Aid, model);
            }
        }


        //Update updateToFollowup
        public async Task<TranStatus> updateToFollowup(int Aid, ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.updateToFollowup(Aid, model);
            }
        }

        //Update updateToClose
        public async Task<TranStatus> updateToClose(int Aid, ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.updateToClose(Aid, model);
            }
        }

        //Update updateToCancel
        public async Task<TranStatus> updateToCancel(int Aid, ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.updateToCancel(Aid, model);
            }
        }


        //Activity History
        public async Task<TranStatus> activity_history(int Aid, ActivityListModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.activity_history(Aid, model);
            }
        }





        //Delete
        public async Task<TranStatus> deleteActivity(int Aid)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.deleteActivity(Aid);
            }
        }

        ////Change Status Activity Inprogress
        //public async Task<TranStatus> ChangeStatusActivity_Inprogress(int aid)
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return await activityRepository.ChangeStatusActivity_Inprogress(aid);
        //    }
        //}

        ////Change Status Activity Followup
        //public async Task<TranStatus> ChangeStatusActivity_Followup(int aid)
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return await activityRepository.ChangeStatusActivity_Followup(aid);
        //    }
        //}

        ////Change Status Activity Close
        //public async Task<TranStatus> ChangeStatusActivity_Close(int aid)
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return await activityRepository.ChangeStatusActivity_Close(aid);
        //    }
        //}
    }
}
