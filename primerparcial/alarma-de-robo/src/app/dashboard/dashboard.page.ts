import { Component, OnInit } from '@angular/core';//
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  accX: any;
  accY: any;
  accZ: any;
  promise: any;
  promiseDos: any;
  isVertial: any;
  isHorizontal: any;
  isLeft: any;
  isRight: any;
  isOn: any;
  options: GyroscopeOptions = {
    frequency: 1000
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion,
    private flashlight: Flashlight,
    private vibration: Vibration,
    private nativeAudio: NativeAudio,
    private alertController: AlertController
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

    this.isVertial = false;
    this.isHorizontal = true;
    this.isLeft = false;
    this.isRight = false;
    this.isOn = false;
    this.cargarAudios();

  }

  async Ingreseclave() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      inputs: [
        {
          name: 'clave',
          type: 'password',
          placeholder: 'Ingrese contraseña',
          cssClass: 'specialClass',
          attributes: {
            minlength: 6,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');

          }
        }, {
          text: 'Aceptar',
          handler: (alertData) => {
            console.log('Confirm Ok');
            switch(alertData.clave){
              case "111111" :{
                if(this.userEmail == "admin@admin.com"){
                  this.Detener();
                }
              break;
              }
              case "222222" :{
                if(this.userEmail == "invitado@invitado.com"){
                  this.Detener();
                }
              break;
              }
              case "333333" :{
                if(this.userEmail == "usuario@usuario.com"){
                  this.Detener();
                }
              break;
              }
              case "444444" :{
                if(this.userEmail == "anonimo@anonimo.com"){
                  this.Detener();
                }
              break;
              }
              case "555555" :{
                if(this.userEmail == "tester@tester.com"){
                  this.Detener();
                }
              break;
              }
              default: { 
                
              break; 
              } 
            }
          }
        }
      ]
    });

    await alert.present();
  }


  // Acelerometro
  Accelerometer() {

      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) =>
         // console.log(acceleration),
        (error: any) => console.log(error)
      );

      // Watch device acceleration
      this.promise = this.deviceMotion.watchAcceleration(this.options)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {

          this.accX = acceleration.x;
          this.accY = acceleration.y;
          this.accZ = acceleration.z;

          // // Izquierda
          if ( acceleration.x >= 2 && !this.isLeft) {
            this.isLeft = true;
            this.nativeAudio.play('izquierda');
          }

          // Derecha
          if ( acceleration.x <= -2 && !this.isRight) {
            this.isRight = true;
            this.nativeAudio.play('derecha');
          }

          // Vertical
          if (acceleration.y > 8 && acceleration.z  < 2 && !this.isVertial && this.flashlight.available()) {
            this.isVertial = true;
            this.isHorizontal = false;
            this.flashlight.switchOn();
            this.nativeAudio.play('vertical');
            setTimeout(() => this.flashlight.switchOff(), 5000);
          }

          // Horizontal
          if (acceleration.y < 2 && acceleration.z  > 8 && !this.isHorizontal) {
            this.isHorizontal = true;
            this.isVertial = false;
            this.vibration.vibrate(5000);
            this.nativeAudio.play('horizontal');
          }

      });
  }

  Stop() {

    if (this.promise !== undefined) {
      this.promise.unsubscribe();
    }
    if (this.promiseDos !== undefined) {
        this.promiseDos.unsubscribe();
    }
  }

  Clear() {
    this.isLeft = false;
    this.isRight = false;
    this.isVertial = false;
    this.isHorizontal = false;
    this.isOn = false;
  }

  Iniciar(){
    this.isOn = true;
    this.Accelerometer();
  }

  Detener(){
    this.Stop();
    this.Clear();
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.nativeAudio.unload('derecha');
        this.nativeAudio.unload('horizontal');
        this.nativeAudio.unload('izquierda');
        this.nativeAudio.unload('vertical');
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  cargarAudios() {
    this.nativeAudio.preloadSimple('derecha', 'assets/sounds/derecha.m4a');
    this.nativeAudio.preloadSimple('horizontal', 'assets/sounds/horizontal.m4a');
    this.nativeAudio.preloadSimple('izquierda', 'assets/sounds/izquierda.m4a');
    this.nativeAudio.preloadSimple('vertical', 'assets/sounds/vertical.m4a');
  }

}


