import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getAllPlaylists() {
    const playlists = [];
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.key(i);
      if (value && value.startsWith('playlist')) {
        const item = localStorage.getItem(value);
        const playlist = JSON.parse(item!);
        playlists.push({key: value, name: playlist.name, playlist: playlist.playlist });
      }
    }
    return playlists;
  }

  clear(): void {
    localStorage.clear();
  }
}