import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemoService } from './../../../service/demo.service';
import { Component, OnInit } from '@angular/core';
import { DemoModel } from '../../../model/model';

@Component({
  selector: 'app-viewdemo',
  templateUrl: './viewdemo.component.html',
  styleUrls: ['./viewdemo.component.css']
})
export class ViewdemoComponent implements OnInit {

  Demo=new DemoModel();
  DemoDetails:DemoModel[]=[];
  constructor(
    private demoService:DemoService,
    private modalService:NgbModal
  ) { 
    this.demoList();
  }

  ngOnInit() {
  }
  //Display
  // demoList(){
  //   this.DemoService.demoList().subscribe((data:any)=>{
  //     if(data.Status.code===0){
  //       if(data.DemoList){
  //         this.DemoDetails=data.DemoList;
  //         console.log(this.DemoDetails);
  //       }
  //     }
  //   },(err)=>{

  //   });
  // }

  demoList() {
    this.demoService.demoList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.DemoList) {
          this.DemoDetails = data.DemoList;
        }
      }
    }, (err) => {

    });

   }

  openupdatemodal(content,item){
    this.Demo = item;
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];
  }
  onDelete(ID:number){

  }
  onEdit(ID:number){

  }
  
}
