import { Component } from '@angular/core';
import { MusicServiceService } from '../services/music-service.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-jukebox-page',
  imports: [MatTableModule],
  templateUrl: './jukebox-page.component.html',
  styleUrl: './jukebox-page.component.css'
})
export class JukeboxPageComponent {
  constructor(private musicService: MusicServiceService) {}
  musicData: any = [];
  displayedColumns: string[] = ['songName', 'description', 'date', 'folder'];
  ngOnInit() {
    this.musicService.getMusicData().subscribe(data => {
      this.musicData = data;
    })
    console.log(this.musicData);
  }
}
