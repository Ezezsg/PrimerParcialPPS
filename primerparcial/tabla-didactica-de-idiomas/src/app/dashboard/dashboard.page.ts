import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  private url_img_p = [
          {
            "url": "./assets/img/españa.jpg"//0
          },
          {
            "url": "./assets/img/inglaterra.jpg"//1
          },
          {
            "url": "./assets/img/portugal.jpg"//2
          },
        ];  
  private url_img = [];
  private idReproduciendose;
  public faIconTematica;
  public faIconIdioma;
  private tematica;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private nativeAudio: NativeAudio
  ) { }

  ngOnInit() {
  	this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
    
    this.tematica = "colores";
    this.faIconTematica = "color-palette";
    this.faIconIdioma = "español";
    this.cambiarTematica("colores");
    this.cambiarImagenes('colores');
    this.instanciarAudios("español");
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  instanciarAudios(idioma: string)
  {
        if(idioma == "español"){
          this.faIconIdioma = "español";
        }
        if(idioma == "ingles"){
          this.faIconIdioma = "ingles";
        }
        if(idioma == "portugues"){
          this.faIconIdioma = "portugues";
        }
        
        if (this.faIconTematica == "color-palette") {
          this.tematica = "colores";
          this.nativeAudio.unload('id_1');
          this.nativeAudio.unload('id_2');
          this.nativeAudio.unload('id_3');
          this.nativeAudio.unload('id_4');
          this.nativeAudio.unload('id_5');
          this.nativeAudio.preloadComplex('id_1','assets/sounds/' +idioma+ '/' +this.tematica+ '/1.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_2','assets/sounds/' +idioma+ '/' +this.tematica+ '/2.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_3','assets/sounds/' +idioma+ '/' +this.tematica+ '/3.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_4','assets/sounds/' +idioma+ '/' +this.tematica+ '/4.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_5','assets/sounds/' +idioma+ '/' +this.tematica+ '/5.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          // this.nativeAudio.preloadSimple('id_2','assets/sounds/' +idioma+ '/' +this.tematica+ '/2.m4a').then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
        }
        if (this.faIconTematica == "grid") {
          this.tematica = "numeros";
          this.nativeAudio.unload('id_1');
          this.nativeAudio.unload('id_2');
          this.nativeAudio.unload('id_3');
          this.nativeAudio.unload('id_4');
          this.nativeAudio.unload('id_5');
          this.nativeAudio.preloadComplex('id_1','assets/sounds/' +idioma+ '/' +this.tematica+ '/1.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_2','assets/sounds/' +idioma+ '/' +this.tematica+ '/2.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_3','assets/sounds/' +idioma+ '/' +this.tematica+ '/3.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_4','assets/sounds/' +idioma+ '/' +this.tematica+ '/4.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_5','assets/sounds/' +idioma+ '/' +this.tematica+ '/5.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
        }
        if (this.faIconTematica == "paw") {
          this.tematica = "animales";
          this.nativeAudio.unload('id_1');
          this.nativeAudio.unload('id_2');
          this.nativeAudio.unload('id_3');
          this.nativeAudio.unload('id_4');
          this.nativeAudio.unload('id_5');
          this.nativeAudio.preloadComplex('id_1','assets/sounds/' +idioma+ '/' +this.tematica+ '/1.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_2','assets/sounds/' +idioma+ '/' +this.tematica+ '/2.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_3','assets/sounds/' +idioma+ '/' +this.tematica+ '/3.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_4','assets/sounds/' +idioma+ '/' +this.tematica+ '/4.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
          this.nativeAudio.preloadComplex('id_5','assets/sounds/' +idioma+ '/' +this.tematica+ '/5.m4a', 1, 1, 0).then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
        }
  }

  functSuccess(mensaje)
  {
    console.log(mensaje);
  }

  playSound(id_sound: string)
      {
        this.nativeAudio.play(id_sound).then((msg)=>this.functSuccess(msg), (err) => this.functSuccess(err));
      }

  cambiarTematica(tem:string) {
        // this.instanciarAccionSheet();
    switch(tem){
      case "colores" :{
        this.faIconTematica = "color-palette";
        this.tematica = "colores";
        this.cambiarImagenes('colores');      
        this.instanciarAudios(this.faIconIdioma);
        break;
      }
      case "numeros" :{
        this.faIconTematica = "grid";
        this.tematica = "numeros";
        this.cambiarImagenes('numeros');      
        this.instanciarAudios(this.faIconIdioma);
        break;
      }
      case "animales" :{
        this.faIconTematica = "paw";
        this.tematica = "animales";
        this.cambiarImagenes('animales');      
        this.instanciarAudios(this.faIconIdioma);
        
        break;
      }
      /*default: { 
                
        break; 
      } */
    }
        
  }

  cambiarImagenes(tematica: string)
  {
    
        this.url_img = [
          {
            "url": "./assets/img/" +tematica+ "/1.jpg"
          },
          {
            "url": "./assets/img/" +tematica+ "/2.jpg"
          },
          {
            "url": "./assets/img/" +tematica+ "/3.jpg"
          },
          {
            "url": "./assets/img/" +tematica+ "/4.jpg"
          },
          {
            "url": "./assets/img/" +tematica+ "/5.jpg"
          }
        ];  
  }
  

}


