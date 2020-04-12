using STS.Common;
using STS.DAL;
using STS.Model;
using System.Collections.Generic;
using STS.BLL.Interface;
using System.Threading.Tasks;

namespace STS.BLL.Service
{
    public class ChatServices : IChat

    {

        ChatRepository chatRepository = null;

        public Task<TranStatus> sendmessage(ChatModel model)
        {
            using (chatRepository = new ChatRepository())
            {
                return chatRepository.sendmessage(model);

            }
        }


        public List<ChatModel> getchats(ChatModel model)
        {
            using (chatRepository = new ChatRepository())
            {
                return chatRepository.getchats(model);
            }
        } 
        
        public List<ChatModel> unread_messages(ChatModel model)
        {
            using (chatRepository = new ChatRepository())
            {
                return chatRepository.unread_messages(model);
            }
        }

        //Delete
        public async Task<TranStatus> deleteMsg(int ID, ChatModel model)
        {
            using (chatRepository = new ChatRepository())
            {
                return await chatRepository.deleteMsg(ID,model);
            }
        }
    }
}
