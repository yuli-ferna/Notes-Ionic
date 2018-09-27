import { Injectable } from "@angular/core";
import TsMap from 'ts-map';
import { AngularFireDatabase } from "@angular/fire/database/database";
import { Observable } from 'rxjs/Observable';

@Injectable()
 export class NoteService{
     notes = []
     constructor (public afDB: AngularFireDatabase){}
     /**
      * getNotes
    */
     public getNotes() {
        //  return this.notes;
        return this.afDB.list('notes/');
     }
    public getNote(id){
        // return this.notes.filter(function(e, i){return e.id == id})[0] || {id:null, title:null, description:null};
        return this.afDB.object('notes/' + id);        
     }

    public createNote(note){
        // this.notes.push(note);
        note.id= Date.now();
        this.afDB.database.ref('notes/' + note.id).set(note);
    }
    
    public editNote(note){
        /* for (let ii = 0; ii < this.notes.length; ii++) {
            if(this.notes[ii].id == note.id)
            this.notes[ii] = note;
            
        } */
        this.afDB.database.ref('notes/' + note.id).set(note);

    }

    public deleteNote(note){
        /* for (let ii = 0; ii < this.notes.length; ii++) {
            if(this.notes[ii].id == note.id)
            this.notes.splice(ii, 1);
            
        } */
        this.afDB.database.ref('notes/' + note.id).remove();
    }
  
 }