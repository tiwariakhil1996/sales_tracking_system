import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBaU6eEpioeuf9Nkzsd5N3OoJsDpVQdzEs',
      libraries: ['places']
    }),
  ],
  declarations: [
    MapComponent
  ]
})
export class MapModule { }
