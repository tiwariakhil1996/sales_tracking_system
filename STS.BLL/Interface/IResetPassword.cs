﻿using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IResetPassword
    {
       
        //Reset Password Admin
        Task<TranStatus> ResetPasswordAdmin(int ResetPassword_id, ResetPasswordAdminModel model);
    }
}