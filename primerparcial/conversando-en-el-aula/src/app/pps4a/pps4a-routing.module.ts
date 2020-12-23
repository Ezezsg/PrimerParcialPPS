import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pps4aPage } from './pps4a.page';

const routes: Routes = [
  {
    path: '',
    component: Pps4aPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pps4aPageRoutingModule {}
