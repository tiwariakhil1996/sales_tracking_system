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
        public Task<TranStatus> SendMail(SendMailModel model)
        {
            using (mailRepository = new MailRepository())
            {
                return mailRepository.SendMail(model);

            }
        }
    }
    
}
