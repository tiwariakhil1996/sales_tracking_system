import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { salesregisterModel } from '../../model/sales';
import { registerModel, avatarModel } from '../../model/admin';
import { SalesService } from '../../service/sales.service';
import { chatModel } from '../../model/chat';
import { ChatService } from '../../service/chat.service';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { DateFormatter } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgZone } from '@angular/core';
import { ChattingService } from '../../service/chatting.service';
import { Message } from '../../model/message';
import { ToastrService } from 'ngx-toastr';
// import { Message } from '../../../model/message';
// import { ChattingService } from '../../../service/chatting.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  ind = 0;

  searchsalesname;

  isShow = true;

  username: string;
  register = new registerModel();
  avatar = new avatarModel();
  profile_pic = new registerModel();

  // salesid: number;
  sales_msg: string;
  admin_msg: string;

  selected_salesid: number;
  unreadmessages: any;
  user = new registerModel();

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  createdby: number;
  currentDate = new Date();
// console.log(currentDate);

  // date: any;


  chat = new chatModel();
  chatDetails: chatModel[] = [];
  unreadChats: chatModel[] = [];
  saleschatDetails: chatModel[] = [];
  // Pagination
  RowCount: number;
  pageSize: number = 5;
  //  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

  search_: any;

  RoleJason = {
    ROle: [0, 1],
    Component: 'ChatComponent'
  };

  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();

  senderId: any;
  receiverId: any;

  messages = new Array<Message>();
  message = new Message();

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  isreceiveddelete = false;

  Delete_received() {
    this.isreceiveddelete = !this.isreceiveddelete;
  }

  issentdelete = false;

  Delete_sent() {
    this.issentdelete = !this.issentdelete;
  }

  status_info = false;

  // Status_info() {
  // this.status_info = !this.status_info;
  // }

  constructor(
    private router: Router,
    private salesService: SalesService,
    private chatService: ChatService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    // private singlRchatService: ChattingService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    const item = { pageIndex: 0 };
    this.SalesList(item);
    // this.SalesList();
    // this.checkRole(this.RoleJason);
    this.getuserProfile();

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.senderId = this.user.id;
    // console.log( this.senderId );
    // this.selected_salesid;
    // console.log(this.selected_salesid);
    this.view_msg();
  }





  Status_info(status_info) {
    this.modalService.open(status_info, { size: 'sm', backdropClass: 'light-blue-backdrop' });
  }



  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  // SalesList() {
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.sales.userid = this.user.id;
  //   this.salesService.SalesList_dropdown(this.sales).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.SalesList_dropdown) {
  //         this.salesDetails = data.SalesList_dropdown;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  onsearch() {
    const item = { pageIndex: 0 };
    this.SalesList(item);
  }

  SalesList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.sales.userid = this.user.id;
    this.sales.pageIndex = item.pageIndex;
    this.sales.pageSize = this.pageSize;

    this.sales.search = this.search_;

    this.salesService.RegisteredSalesList(this.sales).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;

          // this. = this.salesDetails.filter(item => item.salesName == sname);


          this.selected_salesid = this.salesDetails[0].id;
          // console.log(this.selected_salesid);
        }

      }
    }, (err) => {

    });
  }

  sendMessage(i): void {
    if (this.txtMessage) {

      this.message = new Message();

      this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
      this.message.senderId = this.user.id;
      this.message.sendername = this.user.username;
      this.message.senderType = this.user.userType;
      this.message.receiverId = i;
      // Transaction using singlR
      // this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      // this.messages.push(this.message);
      this.messages.push(this.message);

      // this.toastr.success(this.message, 'New Message', {
      //   disableTimeOut: false
      // });

      this.chatService.sendMessage(this.message);
      this.txtMessage = '';

      // Into Database
      // if(this.txtMessage.length > 0) {
      this.chatService.send_msg(this.message).subscribe((data: any) => {
        if (data.Status.code === 0) {

        }
      }, (err) => {


      });
    }
  }


  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {

        // if (message.clientuniqueid !== this.uniqueID) {
        if (message.receiverId === this.user.id) {
          message.type = 'received';
          this.messages.push(message);
           
          this.toastr.show(message.sendername + ' : '+  message.message, 'New Message', {
            // disableTimeOut: false,
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            tapToDismiss: true,
            closeButton: true,
            progressBar: true

          });
        }
      });
    });
  }

  selected_sales_id(i) {
    this.ind = i;
    this.selected_salesid = this.salesDetails[this.ind].id;
  }

  view_msg() {
    // this.ind = i;
    // this.sales.id = this.salesDetails[this.ind].id;
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.message.receiverId = this.user.id;
    this.message.senderId = this.selected_salesid;
    this.message.status = 1;
    // this.message.senderId = this.salesDetails[0].id;


    this.chatService.get_chats(this.message).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.getchats) {
          this.chatDetails = data.getchats;
          // console.log(  this.chatDetails);
          // this.message = new Message();
          this.messages = new Array<Message>();
        }
      }
    });

    this.chatService.unread_messages(this.message).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.unread_messages) {
          this.unreadChats = data.unread_messages;
          if (this.unreadChats.length > 0) {
            this.unreadmessages = this.unreadChats.length;
            this.toastr.warning(this.unreadmessages, 'Unread Messages', {
              timeOut: 50000,
              positionClass: 'toast-bottom-right',
              closeButton: true
            });
          }
        }
      }
    });

  }

  msg_status() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.message.receiverId = this.user.id;
    this.message.senderId = this.selected_salesid;
    this.message.seen = 1;
    this.chatService.get_chats(this.message).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.getchats) {
          this.chatDetails = data.getchats;
          // console.log(  this.chatDetails);
          // this.message = new Message();
          this.messages = new Array<Message>();
        }
      }
    });
  }


  // Delete

  onDelete(id: number) {
    this.register = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.chat.modifiedby = this.register.id;
    this.chatService.deleteMsg(id, this.chat).subscribe(data => {
      this.view_msg();
    });
  }

  getuserProfile() {
    this.register = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.avatar.image = this.register.image;
    this.username = this.register.username;
    // To display image in update profile modal
    this.profile_pic.image = this.register.image;
  }

}
