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
    public class ClientServices : IClient

    {
        ClientRepository clientRepository = null;

        //Insert
        public Task<TranStatus> addClient(ClientModel model)
        {
            using (clientRepository = new ClientRepository())
            {
                return clientRepository.addClient(model);

            }
        }


        //Display
        public async Task<List<ClientListModel>> ClientList()
        {
            using (clientRepository = new ClientRepository())
            {
                return await clientRepository.ClientList();
            }
        }

        //public async Task<List<ClientListModel>> each_admin_ClientList(ClientListModel model)
        //{
        //    using (clientRepository = new ClientRepository())
        //    {
        //        return await clientRepository.each_admin_ClientList(model);
        //    }

        //}

        public List<ClientListModel>each_admin_ClientList(ClientListModel model, out int RowCount)
        {
            using (clientRepository = new ClientRepository())
            {
                return clientRepository.each_admin_ClientList(model, out RowCount);
            }

        }




        //public async Task<List<ClientListModel>> each_sales_ClientList(ClientListModel model)
        //{
        //    using (clientRepository = new ClientRepository())
        //    {
        //        return await clientRepository.each_sales_ClientList(model);
        //    }

        //}


        public List<ClientListModel> each_sales_ClientList(ClientListModel model, out int RowCount)
        {
            using (clientRepository = new ClientRepository())
            {
                return clientRepository.each_sales_ClientList(model, out RowCount);
            }

        }  
        
        
        public List<ClientListModel> each_user_ClientList(ClientListModel model, out int RowCount)
        {
            using (clientRepository = new ClientRepository())
            {
                return clientRepository.each_user_ClientList(model, out RowCount);
            }

        }
        //Update
        public async Task<TranStatus> updateClient(int ID, ClientListModel model)
        {
            using (clientRepository = new ClientRepository())
            {
                return await clientRepository.updateClient(ID, model);
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
        public async Task<TranStatus> deleteClient(int ID)
        {
            using (clientRepository = new ClientRepository())
            {
                return await clientRepository.deleteClient(ID);
            }
        }

        //Change Status Client
        public async Task<TranStatus> ChangeStatusClient(int id)
        {
            using (clientRepository = new ClientRepository())
            {
                return await clientRepository.ChangeStatusClient(id);
            }
        }

        // Display  Active Deactive Client List
        public async Task<List<ClientListModel>> ClientList_ActiveDeactive()
        {
            using (clientRepository = new ClientRepository())
            {
                return await clientRepository.ClientList_ActiveDeactive();
            }
        }

    }
}
