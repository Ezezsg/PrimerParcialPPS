import { NgModule } from '@angular/core';//
import { CommonModule } from '@angular/common';//
import { FormsModule } from '@angular/forms';//

import { IonicModule } from '@ionic/angular';//

import { ListaPageRoutingModule } from './lista-routing.module';//

import { ListaPage } from './lista.page';//

import { ImageComponent } from 'src/app/components/image/image.component';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    ListaPageRoutingModule
  ],
  declarations: [ListaPage],
  entryComponents: [ImageComponent]
})
export class ListaPageModule {}
