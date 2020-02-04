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


        //Display
        public async Task<List<ActivityListModel>> ActivityList()
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.ActivityList();
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

        ////Update
        //public async Task<Tuple<TranStatus,List<ClientListModel>>> updateClient(int ID, ClientListModel model)
        //{
        //    using (clientRepository = new ClientRepository())
        //    {
        //        TranStatus tranStatus = new TranStatus();
        //        return await clientRepository.updateClient(ID, model);
        //    }
        //}



        //Delete
        public async Task<TranStatus> deleteActivity(int Aid)
        {
            using (activityRepository = new ActivityRepository())
            {
                return await activityRepository.deleteActivity(Aid);
            }
        }
    }
}
