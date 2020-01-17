using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface ISignup
    {
        // vikas
        Task<TranStatus> ProSignup(SignupModel model);
        Task<List<SignupListModel>> ProLogin();
    }
}

