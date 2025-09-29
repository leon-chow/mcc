import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MUSIC_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  constructor(private httpClient: HttpClient) { }

  getMusicData() {
    return this.httpClient.get(MUSIC_URL);
  }
}
