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
        Task<TranStatus> addClient(ClientModel model);

        Task<List<ClientListModel>> ClientList();
    }
}
