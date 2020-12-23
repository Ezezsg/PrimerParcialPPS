import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


import { AuthenticateService } from '../services/authentication.service';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';


@Component({
  selector: 'app-pps4a',
  templateUrl: './pps4a.page.html',
  styleUrls: ['./pps4a.page.scss'],
})
export class Pps4aPage implements OnInit {

  userEmail: string ='';
  userId: string;
  message:string='';
  messages: any[];
  date: Date;
  fecha: any;

  constructor(
  	private navCtrl: NavController, 
    private authService: AuthenticateService, 
    private af: AngularFireDatabase
  ) 
  { 
  	
  }

  ngOnInit() {
  	
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
    this.af.list('/chat-a').valueChanges().subscribe(data=>
        {
          this.messages=data;
          
          //data.map(elem=>{
            // this.messages.push(elem);
         // })
        });
  }

  sendMessage()
  {
    this.date = new Date();
    this.fecha = +" "+this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()+" "+this.date.getHours()+":"+this.date.getMinutes();
    this.af.list('/chat-a').push(
      {
        username : this.userEmail,
        message: this.message,
        fecha: this.fecha

      }).then( ()=>{

      }).catch( ()=>{

      });
      this.message = "";
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

}
