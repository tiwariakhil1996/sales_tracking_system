import { NavigationEnd, Router } from '@angular/router';
import { DemoService } from './../../service/demo.service';
import { DemoModel } from './../../model/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demoallapi',
  templateUrl: './demoallapi.component.html',
  styleUrls: ['./demoallapi.component.css']
})
export class DemoallapiComponent implements OnInit {


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
