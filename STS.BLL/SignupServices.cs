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
    public class SignupServices : ISignup

    {
        SignupRepository signupRepository = null;
        public Task<TranStatus> ProSignup(SignupModel model)
        {
            using (signupRepository = new SignupRepository())
            {
                return signupRepository.ProSignup(model);

            }
        }

        public async Task<List<SignupListModel>> ProLogin()
        {
            using (signupRepository = new SignupRepository())
            {
                return await signupRepository.ProLogin();
            }
        }
    }
}
