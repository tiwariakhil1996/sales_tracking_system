using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IAdmin
    {
        //Register
        Task<TranStatus> AdminRegister(AdminRegisterModel model);

        //Login
        Task<TranStatus> AdminLogin(AdminLoginModel model);

        //Display
        //Task<List<AdminLoginModel>> AdminLogin();
    }
}

