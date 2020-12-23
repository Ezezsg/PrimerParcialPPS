import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pps4bPageRoutingModule } from './pps4b-routing.module';

import { Pps4bPage } from './pps4b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pps4bPageRoutingModule
  ],
  declarations: [Pps4bPage]
})
export class Pps4bPageModule {}
