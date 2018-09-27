import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { NoteService } from '../../services/notes.service';
import { createContentChild } from '@angular/compiler/src/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public note={}
  public show;
  public id: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public noteService: NoteService, 
    public toastCtrl: ToastController,
    private translateService: TranslateService) {
    this.id = navParams.get('id');
    // console.log(this.id);
    if(this.id != 0){
      noteService.getNote(this.id).valueChanges().subscribe( nota => {
        this.note = nota;
      });
    }else{
      this.note = {id:null, title:null, description:null};
    }
    this.show = true;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetailPage');
  }

  presentToastSaveNote() {
    var mensage;
    this.translateService.get('MENSAGE_SAVE_NOTE').subscribe((res: string) => {
      
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
  addNote(){
    /* let note = {
      id:null,
      title:null,
      description:null
    } */
      if (this.id == 0) {
        //this.note.id= Date.now();
        this.noteService.createNote(this.note);
      } else {
        this.noteService.editNote(this.note);
      }
     
      //alert('Nota guardada');
      this.presentToastSaveNote();
      this.navCtrl.pop();    
    
  }

  deleteNote(){
    this.show = false;
    this.noteService.deleteNote(this.note);
      // alert('Nota eliminada');
      this.presentToastDeleteNote();
      this.navCtrl.pop();    
  }
}
