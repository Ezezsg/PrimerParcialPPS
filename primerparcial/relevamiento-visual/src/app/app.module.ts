import { NgModule } from '@angular/core';//
import { BrowserModule } from '@angular/platform-browser';//
import { RouteReuseStrategy } from '@angular/router';//

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';//
import { SplashScreen } from '@ionic-native/splash-screen/ngx';//
import { StatusBar } from '@ionic-native/status-bar/ngx';//
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';//
import { AppRoutingModule } from './app-routing.module';//


import { AngularFireModule } from '@angular/fire';//
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';//
import { AngularFireDatabase } from '@angular/fire/database';//
import { ComponentsModule } from './components/components.module';

import { ImagePicker } from '@ionic-native/image-picker/ngx';//

import { environment } from '../environments/environment';//

import { Camera } from '@ionic-native/camera/ngx';//

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
  	AppRoutingModule,
  	AngularFireAuthModule,
  	AngularFireModule.initializeApp(environment.firebase),
    ComponentsModule
  ],
  providers: [
    StatusBar,
    ImagePicker,
    SplashScreen,
    Camera,
    AngularFireDatabase,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
