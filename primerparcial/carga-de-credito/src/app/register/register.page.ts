import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

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

  async alertaCuentaCreada() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'Tu cuenta ha sido creada. Por favor Iniciar sesión.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaDatosIncorrectos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      message: 'No esta ingresando datos correctos.',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async alertaSeRegistro() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registrado',
      subHeader: '',
      message: 'Se ha registrado.'
    });

    await alert.present();
  }

  constructor(
  	private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public alertController: AlertController
  ) { }

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

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        
        this.alertaSeRegistro();
      }, err => {
        console.log(err);
        this.alertaCuentaCreada();
        this.successMessage = "";
      })
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

}

