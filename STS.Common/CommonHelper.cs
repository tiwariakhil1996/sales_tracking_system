using System;
using System.Collections.Generic;
using System.Text;

namespace STS.Common
{
    public class CommonHelper
    {
        public static TranStatus TransactionErrorHandler(Exception ex)
        {

            TranStatus transaction = new TranStatus();
            if (ex.Message.Contains("||"))
            {
                transaction.code = Convert.ToInt32(ex.Message.Split("||")[0]);
                transaction.returnMessage = ex.Message.Split("||")[1];
            }
            else
            {
                transaction.code = Constants.Status.Error;
                transaction.returnMessage = ex.Message;
            }
            return transaction;
        }
    }
}
