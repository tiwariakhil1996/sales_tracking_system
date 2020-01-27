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
    }
}
