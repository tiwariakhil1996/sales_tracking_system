using STS.Common;
using STS.Model;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IResetPassword
    {
       
        //Reset Password Admin
        Task<TranStatus> ResetPasswordAdmin(string Token, ResetPasswordAdminModel model);
        Task<TranStatus> ResetPasswordSales(string Token, ResetPasswordAdminModel model);
    }
}
