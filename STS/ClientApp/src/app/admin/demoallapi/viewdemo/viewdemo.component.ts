import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemoService } from './../../../service/demo.service';
import { Component, OnInit } from '@angular/core';
import { DemoModel } from '../../../model/demo';

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
  onDelete(id: number) {
    if (confirm('Are you sure to delete this  demo?') === true) {
      this.demoService.deleteDemo(id).subscribe(data => {
        this.demoService.demoList();
        this.demoList();
      });
    }
  }
  
  onEdit(id:number) {
    // this.client.image = this.imageSrc;
    this.demoService.updateDemo(id, this.Demo).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Demo updated sucesfully');
      }
      this.Demo = new DemoModel();
      this.demoList();
    }, (err) => {
    });
  }
  
}
