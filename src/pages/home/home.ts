import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoteService } from "../../services/notes.service";
import { DetailPage } from '../detail/detail';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes = [];
  idioms: any[] = [];
  
  @ViewChild('myNav') nav: NavController
  constructor(public navCtrl: NavController, 
    public noteService: NoteService,
    private translateService: TranslateService,
    private toastCtrl: ToastController) {
    noteService.getNotes().valueChanges().subscribe( notas => {
      this.notes = notas;
    });
    this.idioms = [
      {
        value: 'es',
        label: 'Español'
      },
      {
        value: 'en',
        label: 'Ingles'
      }
    ];
  }
  presentToastChangeLanguage() {
    var mensage;
    this.translateService.get('MENSAGE_CHANGE_LAN').subscribe((res: string) => {
      console.log(res);
      mensage = res;
      let toast = this.toastCtrl.create({
        message: mensage,
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
  });
    
  }
  
  presentToastDeleteNote() {
    var mensage;
    this.translateService.get('MENSAGE_DELETE_NOTE').subscribe((res: string) => {
      console.log(res);
      mensage = res;
      let toast = this.toastCtrl.create({
        message: mensage,
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
  });
    
  }

  choose(lang) {
    console.log(this.translateService.currentLang);
    this.translateService.use(lang);
  }
  
  chooseButton(){
    let lang;
    if(this.translateService.currentLang == "en"){
      lang = "es";
    }else lang = "en";
    this.translateService.use(lang);
    this.presentToastChangeLanguage();
  }

  public noteSelected(note){
    console.log(note);
  }

  public gotToDetail(id){
    this.navCtrl.push(DetailPage, {id: id});
  }
  
  public createNote(){
    this.navCtrl.push(DetailPage, {id: 0});
  }

  public delete(note){
    this.noteService.deleteNote(note);
    this.presentToastDeleteNote();
  }
  
}
