using STS.Common;
using STS.DAL;
using STS.Model;
using System.Collections.Generic;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class DemoServices : IDemo

    {
        //Add Products
        DemoRepository demoRepository = null;
        public Task<TranStatus> AddDemo(DemoModel model)
        {
            using (demoRepository = new DemoRepository())
            {
                return demoRepository.AddDemo(model);

            }
        }

        //View Demo
        public async Task<List<DemoListModel>> DemoList()
        {
            using (demoRepository = new DemoRepository())
            {
                return await demoRepository.DemoList();
            }
        }


        //Update
        public async Task<TranStatus> updateDemo(int ID, DemoListModel model)
        {
            using (demoRepository = new DemoRepository())
            {
                return await demoRepository.updateDemo(ID, model);
            }
        }

        //Delete
        public async Task<TranStatus> deleteDemo(int ID)
        {
            using (demoRepository = new DemoRepository())
            {
                return await demoRepository.deleteDemo(ID);
            }
        }
    }
}
