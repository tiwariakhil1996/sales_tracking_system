using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IAddactivity
    {
        //Add Addactivity
        Task<TranStatus> Addactivity(AddactivityModel model);

         //View Addactivity
        Task<List<AddactivityListModel>> AddactivityList();




        ////Update Product
        //Task<TranStatus> updateProduct(int ID, ProductListModel model);

        ////Delete
        //Task<TranStatus> deleteProduct(int ID);
    }
}

