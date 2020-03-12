using STS.Common;
using STS.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IAdmin
    {
        //Register
        Task<TranStatus> AdminRegister(AdminRegisterModel model);

        //Login
        //Task<TranStatus> AdminLogin(AdminLoginModel model);
        Task<Tuple<List<AdminLoginModel>, TranStatus>> AdminLogin(AdminLoginModel model);

        //UpdateAdminProfile

        //Task<TranStatus> updateAdminProfile(updateProfileModel model);
        Task<Tuple<List<updateProfileModel>, TranStatus>> updateAdminProfile(updateProfileModel model);


        //Display
        //Task<List<AdminLoginModel>> AdminLogin();


        //Change Password
        Task<TranStatus> changeadminPassword(int Id, Changeadmin_passwordModel model);
    }
}
