﻿using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IProduct
    {
        Task<TranStatus> AddProduct(ProductModel model);

        Task<List<ProductDetailsModel>> ProductDetails();

    }
}

