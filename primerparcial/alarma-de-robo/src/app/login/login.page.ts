import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  tipoUser:string;	

  constructor(
  	private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public alertController: AlertController
  ) 
  {

  }

  async alertaLogin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {

  	this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+\\s*$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'El correo electronico es requerido.' },
      { type: 'pattern', message: 'Introduzca un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  };

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/dashboard');
      }, err => {
        this.alertaLogin();
      })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  UserValido(){
    switch(this.tipoUser){
      case "admin":{
        this.validations_form = this.formBuilder.group({
          email: ["admin@admin.com"],
          password: ["111111"]
        });
      break;
      }
      case "invitado":{
        this.validations_form = this.formBuilder.group({
          email: ["invitado@invitado.com"],
          password: ["222222"]
        });
      break;
      }  
      case "usuario":{
        this.validations_form = this.formBuilder.group({
          email: ["usuario@usuario.com"],
          password: ["333333"]
        });
      break;
      }
      case "anonimo":{
        this.validations_form = this.formBuilder.group({
          email: ["anonimo@anonimo.com"],
          password: ["444444"]
        });
      break;
      }
      case "tester":{
        this.validations_form = this.formBuilder.group({
          email: ["tester@tester.com"],
          password: ["555555"]
        });
      break;
      }
    }
  }
}

