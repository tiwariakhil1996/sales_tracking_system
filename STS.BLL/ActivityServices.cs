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

        // Display Sales lat lng ..whom admin has added
        public async Task<List<Sales_Location_Model>> each_admins_sales_Location(Sales_Location_Model model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.each_admins_sales_Location(model);
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


        //Update Activity
        public async Task<TranStatus> updateActivity(int Aid, Update_ActivityModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.updateActivity(Aid, model);
            }
        }





        //Update Products  added in activity
        public async Task<TranStatus> update_old_Products(int Aid, Update_products_in_ActivityModel model)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.update_old_Products(Aid, model);
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





        //Delete Activity
        public async Task<TranStatus> deleteActivity(int Aid)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.deleteActivity(Aid);
            }
        }

        //Delete Activity Product
        public async Task<TranStatus> deleteActivity_Product(int productId)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.deleteActivity_Product(productId);
            }
        }


        // Search Title
        //public async Task<TranStatus> searchTitle(string Title)
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return await activityRepository.searchTitle(Title);
        //    }
        //}

        public async Task<List<ActivityListModel>> searchTitle(int aid)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.searchTitle(aid);
            }
        }

        //public async Task<List<ActivityListModel>> searchTitle()
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return await activityRepository.searchTitle();
        //    }
        //}

        //public async Task<TranStatus> searchTitle(ActivityListModel model)
        //{
        //    using (activityRepository = new ActivityRepository())
        //    {
        //        return await activityRepository.searchTitle(model);
        //    }
        //}

        // Activity Lat Long
        public async Task<List<Activity_Location_Model>> Activity_Location(int aid)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.Activity_Location(aid);
            }
        }
    }
}
