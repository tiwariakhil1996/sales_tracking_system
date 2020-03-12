using STS.Common;
using STS.DAL;
using STS.Model;
using System;
using System.Collections.Generic;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class AdminServices : IAdmin

    {
        // Register

        AdminRepository adminRepository = null;
        public Task<TranStatus> AdminRegister(AdminRegisterModel model)
        {
            using (adminRepository = new AdminRepository())
            {
                return adminRepository.AdminRegister(model);

            }
        }


        // Login

        //AdminRepository adminloginRepository = null;
        //public Task<TranStatus> AdminLogin(AdminLoginModel model)
        //{
        //    using (adminloginRepository = new AdminRepository())
        //    {
        //        return adminloginRepository.AdminLogin(model);

        //    }
        //}

        public Task<Tuple<List<AdminLoginModel>, TranStatus>> AdminLogin(AdminLoginModel model)
        {
            using (adminRepository = new AdminRepository())
            {
                return adminRepository.AdminLogin(model);
            }
        }


        //UpdateAdminProfile
        //public Task<TranStatus> updateAdminProfile(updateProfileModel model)
        //{
        //    using (adminRepository = new AdminRepository())
        //    {
        //        return adminRepository.updateAdminProfile(model);
        //    }
        //}

        public Task<Tuple<List<updateProfileModel>, TranStatus>> updateAdminProfile(updateProfileModel model)
        {
            using (adminRepository = new AdminRepository())
            {
                return adminRepository.updateAdminProfile(model);
            }
        }

        // Display
        //public async Task<List<AdminLoginModel>> AdminLogin()
        //{
        //    using (adminRepository = new AdminRepository())
        //    {
        //        return await adminRepository.AdminLogin();
        //    }
        //}


        //Change Passoword
        public async Task<TranStatus> changeadminPassword(int Id, Changeadmin_passwordModel model)
        {
            using (adminRepository = new AdminRepository())
            {
                return await adminRepository.changeadminPassword(Id, model);
            }
        }
    }
}
