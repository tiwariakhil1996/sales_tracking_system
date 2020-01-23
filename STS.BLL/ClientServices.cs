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
        public Task<TranStatus> addClient(ClientModel model)
        {
            using (clientRepository = new ClientRepository())
            {
                return clientRepository.addClient(model);

            }
        }

        public async Task<List<ClientListModel>> ClientList()
        {
            using (clientRepository = new ClientRepository())
            {
                return await clientRepository.ClientList();
            }
        }
    }
}
