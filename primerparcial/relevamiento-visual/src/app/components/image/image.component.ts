import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ImagesService } from 'src/app/services/images.service';
import { Voto } from 'src/app/models/voto';
import { Imagen } from 'src/app/models/imagen';
import { AuthenticateService } from '../../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() images: Imagen[];
  @Input() startIndex: Number;
  @Input() uid: string;

  userEmail: string;
  userId: string;

  slideOpts;

  constructor
  (
  	navParams: NavParams, 
  	private modalController: ModalController, 
  	private imagesService: ImagesService,
  	private authService: AuthenticateService,
  	private navCtrl: NavController,
  ) 
  {

  	this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        
        this.userEmail = res.email;
        this.userId = res.uid;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

  	console.clear();
  	this.images = navParams.data.images;
    this.uid = navParams.data.uid;
    this.startIndex = navParams.data.startIndex;
    this.slideOpts = {
      effect: 'slide',
      initialSlide: this.startIndex
    };
    console.log(this.images);
  }

  ngOnInit() {
  	
   
  }

  ngOnDestroy() {
    console.log('Items destroyed');
  }

  votar(index: number) {
    console.log('votó ' + index);
    const image: Imagen = this.images[index];

    if (this.verificarVotacion(index)) { // Ya votó esta foto.
      // Remueve el voto de este usuario.
      image.votos = image.votos.filter( voto => {
        return voto.uid !== this.uid;
      });
    } else { // No votó todavía.
      if (!image.votos) {
        image.votos = new Array();
      }
      image.votos.push(new Voto(this.uid));
    }

    this.imagesService.updateItem(image.key, image)
    .catch(error => {
      console.log(error);
    });
  }

  // Verifica si el usuario ya votó.
  verificarVotacion(index: number): boolean {
    const image: Imagen = this.images[index];
    let respuesta = false;

    if (!image.votos) {
      return false;
    }

    for (let i = 0; i < image.votos.length; i++) {
      const voto = image.votos[i];
      if (voto.uid === this.uid) {
        respuesta = true;
        break;
      }
    }

    return respuesta;
  }

  cantidadDeVotos(index: number): number {
    if (this.images && this.images[index].votos) {
      return this.images[index].votos.length;
    } else {
      return 0;
    }
  }

  eliminar(index: number) {
    this.imagesService.deleteItem(this.images[index].key)
    .then(res => {
      this.images.splice(index);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
