using STS.Common;
using STS.Model;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IMail
    {
        //Send Mail
        Task<TranStatus> SendMail(SendMailModel model);     
    }
}
