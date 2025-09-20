import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'http://localhost:3000'
  constructor(private http : HttpClient) { }

  saveNotes(userId:string, title:string, content:string, entryDate:string){
    return this.http.post(`${this.apiUrl}/saveNotes`,{
      userId,
      title,
      content,
      entryDate
    })
  }

  deleteNotes(notesId:string){
    return this.http.delete(`${this.apiUrl}/deleteNotes/${notesId}`)
  }

  editNotes(id:string,content:string,title:string){
    return this.http.put(`${this.apiUrl}/editNotes/${id}`,{
      content,
      title
    })
  }

  getNotes(userId:string){
    return this.http.get(`${this.apiUrl}/getNotes/${userId}`)
  }

  getNoteById(id:string){
    return this.http.get(`${this.apiUrl}/getNoteById/${id}`)
  }
}
