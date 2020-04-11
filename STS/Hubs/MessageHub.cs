using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using STS.Models;

namespace STS.Hubs
{
    public class MessageHub : Hub
    {
        public async Task NewMessage(Message msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
