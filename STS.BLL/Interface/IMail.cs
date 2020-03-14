using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IMail
    {
        //Send Mail
        Task<TranStatus> SendMail(SendMailModel model);
        Task<TranStatus> SendMail_Sales(SendMailModel model);




    }
}
