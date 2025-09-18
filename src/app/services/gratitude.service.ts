import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GratitudeService {

  private apiUrl = 'http://localhost:3000/api'
  constructor(private http : HttpClient) { }

  saveGratitude(userId:string, entryDate: string, gratitudeList:string[], bestPart:string, tomorrow:string){
    return this.http.post(`${this.apiUrl}/saveGratitude`,{
      entryDate,
      userId,
      gratitudeList,
      bestPart,
      tomorrow
    })
  }

  getGratitudeListbyDate(userId:string,date:string){
    return this.http.get(`${this.apiUrl}/gratitude/byDate/${userId}/${date}`)
  }

  getGratitudeList(userId:string){
    return this.http.get(`${this.apiUrl}/gratitude/byUser/${userId}`)
  }

  deleteGratitudeList(entryId:string){
    return this.http.get(`${this.apiUrl}/deleteGratitude/${entryId}`)
  }
}
