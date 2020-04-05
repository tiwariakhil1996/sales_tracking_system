import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { salesregisterModel } from '../../model/sales';
import { registerModel } from '../../model/admin';
import { SalesService } from '../../service/sales.service';
import { chatModel } from '../../model/chat';
import { ChatService } from '../../service/chat.service';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { DateFormatter } from 'ngx-bootstrap';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  ind = 0;

  searchsalesname;

// salesid: number;
  sales_msg: string;
  admin_msg: string;

  user = new registerModel();

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

createdby:number;
currentDate = new Date();

// date: any;


  chat = new chatModel();
  chatDetails: chatModel[] = [];
  saleschatDetails: chatModel[] = [];
   // Pagination
   RowCount: number;
   pageSize: number = 5;
  //  totalPageList: paginationModel[] = [];
   totalPageSize:number;
   pagesize:any;
   currentPageIndex: number = 0;
   pageOfItems: Array<any>;

   search_ : any;

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: 'ChatComponent'
  // };

  constructor(
    private router: Router,
    private salesService: SalesService,
    private chatService: ChatService,
    // private modalService: NgbModal,
    // private modalServices: BsModalService,
    // private toastr: ToastrService,
  ) { }

  ngOnInit() {
    const item = { pageIndex: 0 };
    this.SalesList(item);
    // this.SalesList();
    // this.checkRole(this.RoleJason);
  }  


  // checkRole(RoleJason) {
  //   const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
  //   if (this.RoleJason.Component === RoleJason.Component) {
  //     // console.log(result);
  //     if (!this.RoleJason.ROle.includes(result.userType)) {
  //       this.router.navigate(['admin/login']);
  //     }
  //   }
  // }

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


        }

      }
    }, (err) => {

    });
  }

 

  send_msg(id: number,i) {
    
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.chat.adminId = this.user.id;
    this.chat.salesId = id;
    this.chat.createdby = this.user.id;
     
    if(this.chat.msg.length > 0) {
    this.chatService.send_msg(this.chat).subscribe((data: any) => {
      if (data.Status.code === 0) {

      } 

    }, (err) => {


    });
  }
    this.view_msg(i)
  }

  view_msg(i) {
    this.ind = i;
    this.sales.id = this.salesDetails[this.ind].id;
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.chat.adminId = this.user.id;
    this.chat.salesId = this.sales.id;

    this.chatService.get_chats(this.chat).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.getchats) {
          this.chatDetails = data.getchats;
// console.log( this.chatDetails);

          // if(this.chat.createddate === this.currentDate) {
          //      console.log(this.chatDetails);
          // }
    //   this.date = this.chat.createddate;
    // console.log(this.currentDate | date: 'DD-MM-YYYY');

        }
      }
    });
  }
  
  // view_msg(i) {
  //   this.ind = i;
  //   this.sales.id = this.salesDetails[this.ind].id;
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.chat.adminId = this.user.id;
  //   this.chat.salesId=this.sales.id;

  //   this.chatService.get_chats(this.chat).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.getchats) {
  //         this.chatDetails = data.getchats;

  //       }
  //     }
  //   });
  // }



  // getchats(id:number) {
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.chat.adminId = this.user.id;
  //   this.chat.salesId = id;
  //   // salesid=id;
  //   this.chatService.get_chats(this.chat).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.getchats) {
  //         this.chatDetails = data.getchats;
  //         // this.updateproductDetails = data.ProductList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


}
