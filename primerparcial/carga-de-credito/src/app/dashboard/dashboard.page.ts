import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

import { Platform } from "@ionic/angular";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  scanSub: any;
  valorQr: number = 0;
  valorTexto: string;
  userEmail: string;
  valorBind: number = 0;
  contadorDiez: number = 0;
  contadorCien: number = 0;
  contadorCincuenta: number = 0
  error: string;

  constructor(
    public qrScanner: QRScanner,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public alertController: AlertController,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(0,()=>{
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.scanSub.unsubscribe();
    })
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

  }

  async alertaAdmin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'Ya se cargo dos veces.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async noDetecto() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'NO se detectó código QR.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaUser() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'Ya se cargo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  CargarQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";
          this.scanSub = this.qrScanner.scan().subscribe(
            (text: string) => {
              document.getElementsByTagName("body")[0].style.opacity = "1";
              this.CargarValorQR(text);
              this.qrScanner.hide();
              this.scanSub.unsubscribe();
            },
            (error) => {
              this.noDetecto();
            }
          );
        }
      })
      .catch((e: any) => this.noDetecto());

    setTimeout(() => this.ValidarUser(), 2000);
  }

  ValidarUser() {
    if (this.userEmail == "admin@admin.com") {
      this.ValidarCargasAdmin();
    } else {
      this.ValidarCargasUser();
    }
  }

  ValidarCargasAdmin() {
    if (this.valorQr == 10 && this.contadorDiez < 2) {
      this.valorBind += this.valorQr;
      this.contadorDiez++;
      return true;
    }
    if (this.valorQr == 50 && this.contadorCincuenta < 2) {
      this.valorBind += this.valorQr;
      this.contadorCincuenta++;
      return true;
    }
    if (this.valorQr == 100 && this.contadorCien < 2) {
      this.valorBind += this.valorQr;
      this.contadorCien++;
      return true;
    }
    
    this.alertaAdmin();
    setTimeout(() => console.log(""), 2000);
    return false;
    
  }

  ValidarCargasUser() {
    if (this.valorQr == 10 && this.contadorDiez == 0) {
      this.valorBind += this.valorQr;
      this.contadorDiez++;
      return true;
    }
    if (this.valorQr == 50 && this.contadorCincuenta == 0) {
      this.valorBind += this.valorQr;
      this.contadorCincuenta++;
      return true;
    }
    if (this.valorQr == 100 && this.contadorCien == 0) {
      this.valorBind += this.valorQr;
      this.contadorCien++;
      return true;
    }
    
    this.alertaUser();
    setTimeout(() => console.log(""), 2000);
    return false;
    
  }

  Limpiar() {
    this.valorQr = 0;
    this.valorBind = 0;
    this.contadorCien = 0;
    this.contadorCincuenta = 0;
    this.contadorDiez = 0;

  }

  CargarValorQR(valor: string) {
    switch (valor) {
      case "8c95def646b6127282ed50454b73240300dccabc":{
        this.valorQr = 10;
        break;
      }    
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":{
        this.valorQr = 50;
        break;
      }
      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":{
        this.valorQr = 100;
        break;
      }
      // default:{
      //   this.valorQr = 0;
      //   break;
      // }
    }
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.Limpiar();
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

}


