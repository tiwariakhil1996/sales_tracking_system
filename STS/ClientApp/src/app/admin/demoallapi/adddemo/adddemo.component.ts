import { DemoService } from './../../../service/demo.service';
import { Component, OnInit } from '@angular/core';
import { DemoModel } from '../../../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adddemo',
  templateUrl: './adddemo.component.html',
  styleUrls: ['./adddemo.component.css']
})
export class AdddemoComponent implements OnInit {

  Demo=new DemoModel();
  DemoDetails:DemoModel[]=[];
  constructor(
    private DemoService:DemoService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  submitForm(){
    this.DemoService.addDemo(this.Demo).subscribe((data:any)=>{
      if (data.Status.code===0) {

        alert('Add Demo Successfully');
        // this.router.navigate(["/admin/demoallapi"]);
      }
      this.Demo=new DemoModel();
    },(err)=>{

    });
}

resetForm(){

}
}
