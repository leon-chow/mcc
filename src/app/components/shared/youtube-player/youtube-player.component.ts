import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-youtube-player',
  imports: [YoutubePlayerComponent, YouTubePlayer, MatButtonModule],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.css'
})
export class YoutubePlayerComponent {
  videoPlayerWidth: number = 0;
  @Input() videoId: string = "";
  @Output() playNext: EventEmitter<any> = new EventEmitter();
  playerConfig = {
    controls: 1,
    mute: 0,
    autoplay: 1
  };
  
  ngOnInit() {
    this.videoPlayerWidth = window.innerWidth - 100;
    this.videoId = "49AZqVhXVeU"
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.videoPlayerWidth = window.innerWidth - 100;
  }

  playerStateChange(event: any) {
    if (event.data === 0) {
      this.playNext.emit();
    }
  }
  
  playNextSong() {
    this.playNext.emit();
  }
}
