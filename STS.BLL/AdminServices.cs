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


        public Task<Tuple<List<AdminLoginModel>, TranStatus>> AdminLogin(AdminLoginModel model)
        {
            using (adminRepository = new AdminRepository())
            {
                return adminRepository.AdminLogin(model);
            }
        }


        // AdminLogout

        public async Task<TranStatus> AdminLogout(int id)
        {
            using (adminRepository = new AdminRepository())
            {
                return await adminRepository.AdminLogout(id);
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


        //public Task<TranStatus> sendmessage(ChatModel model)
        //{
        //    using (adminRepository = new AdminRepository())
        //    {
        //        return adminRepository.sendmessage(model);

        //    }
        //}

        //public Task<List<TranStatus>> getchats(int Id, ChatModel model)
        //{
        //    using (adminRepository = new AdminRepository())
        //    {
        //        return adminRepository.getchats(Id, model);

        //    }
        //}

        //public async Task<List<ChatModel>> getchats(int Id)
        //{
        //    using (adminRepository = new AdminRepository())
        //    {
        //        return await adminRepository.getchats(Id);
        //    }
        //}

        //public List<ChatModel> getchats(ChatModel model)
        //{
        //    using (adminRepository = new AdminRepository())
        //    {
        //        return adminRepository.getchats(model);
        //    }
        //}


    }
}
