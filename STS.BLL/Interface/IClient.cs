using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IClient
    {
        //Insert
        Task<TranStatus> addClient(ClientModel model);

        //Display
        Task<List<ClientListModel>> ClientList();

        //Update
        Task<TranStatus> updateClient(int ID, ClientListModel model);

        ////Update
        //Task<Tuple<TranStatus,List<ClientListModel>>> updateClient(int ID, ClientListModel model);


        //Delete
        Task<TranStatus> deleteClient(int ID);


        //Change Status Client
        Task<TranStatus> ChangeStatusClient(int id);

        //Display Active Deactive Client
        Task<List<ClientListModel>> ClientList_ActiveDeactive();


    }
}

