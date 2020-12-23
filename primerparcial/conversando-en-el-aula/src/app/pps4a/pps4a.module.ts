import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pps4aPageRoutingModule } from './pps4a-routing.module';

import { Pps4aPage } from './pps4a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pps4aPageRoutingModule
  ],
  declarations: [Pps4aPage]
})
export class Pps4aPageModule {}
