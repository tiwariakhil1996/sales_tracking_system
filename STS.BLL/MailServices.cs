using STS.Common;
using STS.DAL;
using STS.Model;
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
        
        
        
        public async Task<TranStatus> SendMail_Sales(SendMailModel model)
        {
            using (mailRepository = new MailRepository())
            {
                return await mailRepository.SendMail_Sales(model);

            }
        }

    }
    
}
