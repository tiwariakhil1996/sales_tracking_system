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

        //Update
        //Task<TranStatus> updateClient(int ID, ClientListModel model);

        ////Update
        //Task<Tuple<TranStatus,List<ClientListModel>>> updateClient(int ID, ClientListModel model);


        //Delete
        //Task<TranStatus> deleteClient(int ID);
    }
}

