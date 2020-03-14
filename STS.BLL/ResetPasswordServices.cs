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
    public class ResetPasswordServices : IResetPassword
    {

        ResetPasswordRepository resetpasswordRepository = null;

        //Reset Passoword Admin
        public async Task<TranStatus> ResetPasswordAdmin(string Token, ResetPasswordAdminModel model)
        {
            using (resetpasswordRepository = new ResetPasswordRepository())
            {
                return await resetpasswordRepository.ResetPasswordAdmin(Token, model);
            }
        } 
        
        
        public async Task<TranStatus> ResetPasswordSales(string Token, ResetPasswordAdminModel model)
        {
            using (resetpasswordRepository = new ResetPasswordRepository())
            {
                return await resetpasswordRepository.ResetPasswordSales(Token, model);
            }
        }
    }
}
