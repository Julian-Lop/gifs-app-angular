import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList: Gif[] = []

  private _tagsHistory: string[] = []
  private _apiKey = 'vtZNGuV7kiHQSy3wPDYEPAv9g1m2OVdk'
  private service_url = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this._loadLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private _organizeHistory(tag: string){
    tag = tag.toLowerCase()

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag)

    if(this._tagsHistory.length > 10){
      this._tagsHistory.pop()
    }

    this._saveLocalStorage()
  }

  private _saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private _loadLocalStorage():void {
    let temporal = localStorage.getItem('history')

    if(temporal){
      this._tagsHistory = JSON.parse(temporal)
      this.searchTag(this._tagsHistory[0])
    }
  }

  searchTag(tag: string):void {
    if(tag.trim().length == 0) return
    this._organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.service_url}/search`,{params})
    .subscribe(resp => {
      this.gifList = resp.data
    })
  }
}
