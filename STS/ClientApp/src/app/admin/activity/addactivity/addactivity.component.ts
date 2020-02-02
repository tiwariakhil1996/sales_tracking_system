import { Component, OnInit } from '@angular/core';
import { activityModel } from '../../../model/model';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {

  activity = new activityModel()
  activityDetails: activityModel[]=[];

  constructor() { }

  ngOnInit() {
  }

  changeCategory(){
    
  }
}
