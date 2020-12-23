import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pps4bPage } from './pps4b.page';

const routes: Routes = [
  {
    path: '',
    component: Pps4bPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pps4bPageRoutingModule {}
