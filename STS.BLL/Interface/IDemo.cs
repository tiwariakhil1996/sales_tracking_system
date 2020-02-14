using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IDemo
    {
        //Add Products
        Task<TranStatus> AddDemo(DemoModel model);

        //View Demo
        Task<List<DemoListModel>> DemoList();


        //Update Demo
        Task<TranStatus> updateDemo(int ID, DemoListModel model);

        //Delete
        Task<TranStatus> deleteDemo(int ID);
    }
}

