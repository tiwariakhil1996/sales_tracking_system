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

        ////View Products
        //Task<List<ProductListModel>> ProductList();


        ////Update Prodcut
        //Task<TranStatus> updateProduct(int ID, ProductListModel model);

        ////Delete
        //Task<TranStatus> deleteProduct(int ID);
    }
}

