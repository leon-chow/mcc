import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-youtube-player',
  imports: [SharedModule],
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
}
