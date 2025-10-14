import { Component, ViewChild } from '@angular/core';
import { MusicServiceService } from '../../services/music-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { YoutubePlayerComponent } from '../../components/shared/youtube-player/youtube-player.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { shuffleArray } from '../../utils/math';

@Component({
  selector: 'app-jukebox-page',
  imports: [SharedModule, YoutubePlayerComponent],
  templateUrl: './jukebox-page.component.html',
  styleUrl: './jukebox-page.component.css',
})
export class JukeboxPageComponent {
  constructor(private musicService: MusicServiceService) {}
  
  musicData: any = [];
  filteredData: any = [];
  playlist: any = [];
  searchInput: string = "";
  displayedColumns: string[] = ['mark','songName', 'description', 'date', 'folder'];
  videoId: string = "";
  currentPlaylistIndex: number = 0;
  currentPlayedSong: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  musicTableDataSource = new MatTableDataSource();
  
  ngOnInit() {
    this.musicService.getMusicData().subscribe(data => {
      this.musicData = data;
      this.filteredData = data;
      this.setTableDataSource(this.musicData);
    })
  }

  setTableDataSource(musicData: any[]) {
    this.musicTableDataSource = new MatTableDataSource(musicData);
    this.musicTableDataSource.paginator = this.paginator;
  }
  
  onSearchChange(searchEvent: Event) {
    this.musicTableDataSource.filterPredicate = (data: any, filter: string) => {
      return data.metadata.title.toLowerCase().includes(filter) || data.description.toLowerCase().includes(filter); 
    };
    const value = ((searchEvent.target) as HTMLInputElement).value
    this.musicTableDataSource.filter = value.trim().toLowerCase();
    if (this.musicTableDataSource.paginator) {
      this.musicTableDataSource.paginator.firstPage();
    }
  }

  onDateFilter(searchFilter: MatDatepickerInputEvent<any, any>, dateRangeSelection: string) {
    this.filteredData = this.musicData.filter((song: any) => {
      const searchDate = new Date(searchFilter.value);
      const compareDate = new Date(song.source.date);
      if (dateRangeSelection === 'before') {
        return compareDate.getTime() < searchDate.getTime();
      } else {
        return compareDate.getTime() > searchDate.getTime();
      }
    })
    this.setTableDataSource(this.filteredData);
  }

  onDateRangeFilter(dateRangeStart: any, dateRangeEnd: any) {
    this.filteredData = this.musicData.filter((song: any) => {
      const rangeStartDate = new Date(dateRangeStart.value);
      const rangeEndDate = new Date(dateRangeEnd.value);
      const compareDate = new Date(song.source.date);
      return compareDate.getTime() > rangeStartDate.getTime() && compareDate.getTime() < rangeEndDate.getTime();
    })
    this.setTableDataSource(this.filteredData);
  }

  playNextSong() {
    if (this.playlist.length < 1) {
      const rand = Math.round(Math.random() * (this.filteredData.length - 1));
      this.videoId = this.filteredData[rand].youtube;
      this.currentPlayedSong = this.filteredData[rand].metadata.title;
    } else {
      this.currentPlaylistIndex++; 
      this.playSong(this.playlist[this.currentPlaylistIndex].songName, this.playlist[this.currentPlaylistIndex].youtube);
    }
  } 

  playPreviousSong() {
    this.currentPlaylistIndex--;
    this.playSong(this.playlist[this.currentPlaylistIndex].songName, this.playlist[this.currentPlaylistIndex].youtube);
  }

  shufflePlaylist() {
    this.resetPlaylist();
    const shuffledMusic = shuffleArray(this.filteredData);
    shuffledMusic.map((song: any) => {
      this.playlist.push(
        {songName: song.metadata.title, youtube: song.youtube}
      )
    })
    this.playSong(this.playlist[this.currentPlaylistIndex].songName, this.playlist[this.currentPlaylistIndex].youtube);
  }

  playSong(song: string, link: string) {
    this.videoId = link;
    this.currentPlayedSong = song;
  }

  resetPlaylist() {
    this.playlist = [];
    this.currentPlaylistIndex = 0;
  }
}
