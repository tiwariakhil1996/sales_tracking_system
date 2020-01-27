﻿using STS.Common;
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
        Task<Tuple<TranStatus,List<ClientListModel>>> updateClient(long ID, ClientListModel model);

      
        //Delete
        Task<TranStatus> deleteClient(int ID);
    }
}

