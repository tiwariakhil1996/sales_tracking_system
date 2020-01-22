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
    public class DemoServices : IDemo

    {
        DemoRepository demoRepository = null;
        public Task<TranStatus> DemoRegister(DemoRegisterModel model)
        {
            using (demoRepository = new DemoRepository())
            {
                return demoRepository.DemoRegister(model);

            }
        }

        public async Task<List<DemoLoginModel>> DemoLogin()
        {
            using (demoRepository = new DemoRepository())
            {
                return await demoRepository.DemoLogin();
            }
        }
    }
}
