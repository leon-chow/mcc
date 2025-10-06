import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-youtube-player',
  imports: [YoutubePlayerComponent, YouTubePlayer, MatButtonModule],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.css'
})
export class YoutubePlayerComponent {
  @Input() videoId: string = "";
  @Output() playNext: EventEmitter<any> = new EventEmitter();
  playerConfig = {
    controls: 1,
    mute: 0,
    autoplay: 1
  };
  ngOnInit() {
    this.videoId = "49AZqVhXVeU"
  }

  playerStateChange(event: any) {
    console.log(event);
    if (event.data === 0) {
      this.playNext.emit();
    }
  }
  
  playNextSong() {
    this.playNext.emit();
  }
}
