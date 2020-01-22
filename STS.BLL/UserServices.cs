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
    public class UserServices : IUser

    {
        UserRepository userRepository = null;
        public Task<TranStatus> RegisterUser(RegisterModel model)
        {
            using (userRepository = new UserRepository())
            {
                return userRepository.RegisterUser(model);

            }
        }

        public async Task<List<RegisterListModel>> RegisterList()
        {
            using (userRepository = new UserRepository())
            {
                return await userRepository.RegisterList();
            }
        }
    }
}
