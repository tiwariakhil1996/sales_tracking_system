using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IDemo
    {
        Task<TranStatus> DemoRegister(DemoRegisterModel model);
        Task<List<DemoLoginModel>> DemoLogin();
    }
}

