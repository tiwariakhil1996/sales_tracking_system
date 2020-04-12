using STS.Common;
using STS.Model;
using System;
using STS.BLL;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STS.BLL.Interface
{
    public interface IChat  
    {

        Task<TranStatus> sendmessage(ChatModel model);

        List<ChatModel> getchats(ChatModel model);
        List<ChatModel> unread_messages(ChatModel model);

        Task<TranStatus> deleteMsg(int ID, ChatModel mode);


    }
}
