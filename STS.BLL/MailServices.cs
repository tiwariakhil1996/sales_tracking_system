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
    public class MailServices : IMail

    {
        // Send Mail
        MailRepository mailRepository = null;
        //public Task<TranStatus> ResetPassword(ResetPasswordModel model)
        //{
        //    using (mailRepository = new MailRepository())
        //    {
        //        return  mailRepository.ResetPassword(model);

        //    }
        //}

        public async Task<TranStatus> ResetPassword(ResetPasswordModel model)
        {
            using (mailRepository = new MailRepository())
            {
                return await mailRepository.ResetPassword(model);

            }
        }
    }
    
}
