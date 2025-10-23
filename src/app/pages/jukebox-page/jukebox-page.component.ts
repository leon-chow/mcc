import { Component, ViewChild } from '@angular/core';
import { MusicServiceService } from '../../services/music-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { YoutubePlayerComponent } from '../../components/shared/youtube-player/youtube-player.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { shuffleArray } from '../../utils/math';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SimpleModalComponent } from '../../components/shared/simple-modal/simple-modal.component';

@Component({
  selector: 'app-jukebox-page',
  imports: [SharedModule, YoutubePlayerComponent],
  templateUrl: './jukebox-page.component.html',
  styleUrl: './jukebox-page.component.css',
})
export class JukeboxPageComponent {
  constructor(private musicService: MusicServiceService, private localStorage: LocalStorageService, private dialog: MatDialog) {}
  
  musicData: any = [];
  filteredData: any = [];
  playlist: any = [];
  allPlaylists: any = [];
  searchInput: string = "";
  displayedColumns: string[] = ['mark','songName', 'description', 'date', 'folder'];
  videoId: string = "";
  currentPlaylistIndex: number = 1;
  sortDateDesc: boolean | undefined = undefined;
  sortNameDesc: boolean | undefined = undefined;
  currentPlayedSong: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  musicTableDataSource = new MatTableDataSource();
  
  ngOnInit() {
    this.musicService.getMusicData().subscribe(data => {
      this.musicData = data;
      this.filteredData = data;
      this.setTableDataSource(this.musicData);
    })
    this.allPlaylists = this.localStorage.getAllPlaylists();
    console.log(this.allPlaylists)
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
    this.playlist = this.filteredData;
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

  playlistValueChange(playlistIndex: any) {
    if (playlistIndex >= this.playlist.length) {
      playlistIndex = this.playlist.length;
    } else if (playlistIndex <= 1) {
      playlistIndex = 1;
    }
    this.currentPlaylistIndex = playlistIndex;
  }

  playNextSong(playlistIndex?: number) {
    if (this.playlist.length < 1) {
      const rand = Math.round(Math.random() * (this.filteredData.length - 1));
      this.videoId = this.filteredData[rand].youtube;
      this.currentPlayedSong = this.filteredData[rand].metadata.title;
    } else {
      this.currentPlaylistIndex++; 
      // TODO: Fix input
      if (playlistIndex) {
        this.currentPlaylistIndex = playlistIndex;
        console.log(this.currentPlaylistIndex);
      }
      this.playSong(this.playlist[this.currentPlaylistIndex - 1].songName, this.playlist[this.currentPlaylistIndex - 1].youtube);
    }
  } 

  playPreviousSong() {
    this.currentPlaylistIndex--;
    this.playSong(this.playlist[this.currentPlaylistIndex - 1].songName, this.playlist[this.currentPlaylistIndex - 1].youtube);
  }

  savePlaylist(key?: string) {
    if (this.playlist.length > 0 && key) {
      const item = this.localStorage.getItem(key);
      this.localStorage.setItem(key, {name: item.name, playlist: this.playlist});
      this.allPlaylists = this.localStorage.getAllPlaylists();
    } else if (this.playlist.length > 0 && !key) {
      const dialogRef = this.dialog.open(SimpleModalComponent, {});
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          const newKey = "playlist-" + result + "-" + Math.round(Math.random() * 1000000000);
          this.localStorage.setItem(newKey, {name: result, playlist: this.playlist});
        } 
        this.allPlaylists = this.localStorage.getAllPlaylists();
      });
    }
  }

  deletePlaylist(key: string) {
    this.localStorage.removeItem(key);
    this.allPlaylists = this.localStorage.getAllPlaylists();
  }

  playPlaylist(key: string) {
    this.resetPlaylist();
    this.playlist = this.localStorage.getItem(key).playlist;
    this.playSong(this.playlist[this.currentPlaylistIndex - 1].songName, this.playlist[this.currentPlaylistIndex - 1].youtube);
  }

  shufflePlaylist(playlist?: any) {
    let shuffledMusic;
    this.resetPlaylist();
    if (playlist) {
      shuffledMusic = shuffleArray(this.playlist);
    } else {
      shuffledMusic = shuffleArray(this.filteredData);
    }
    shuffledMusic.map((song: any) => {
      this.playlist.push(
        {songName: song.metadata.title, youtube: song.youtube, date: song.source.date}
      )
    })
    console.log(this.playlist);
    this.playSong(this.playlist[this.currentPlaylistIndex - 1].songName, this.playlist[this.currentPlaylistIndex - 1].youtube);
  }

  playSong(song: string, link: string) {
    this.videoId = link;
    this.currentPlayedSong = song;
    console.log(this.currentPlayedSong);
  }

  sortDate() {
    if (!this.sortDateDesc) {
      this.sortDateDesc = true
    } else {
      this.sortDateDesc = !this.sortDateDesc
    }
    console.log(this.sortDateDesc)
    this.filteredData = this.filteredData.sort((songA: any, songB: any) => {
      const dateA = new Date(songA.source.date);
      const dateB = new Date(songB.source.date);
      if (this.sortDateDesc) {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
    this.setTableDataSource(this.filteredData);
  }

  sortName() {
    if (!this.sortNameDesc) {
      this.sortNameDesc = true;
    } else {
      this.sortNameDesc = !this.sortNameDesc;
    }
    this.filteredData = this.filteredData.sort((songA: any, songB: any) => {
      const songTitleA = songA.metadata.title.toLowerCase();
      const songTitleB = songB.metadata.title.toLowerCase();
      if (songTitleA < songTitleB) {
        if (this.sortNameDesc) {
          return 1;
        } else {
          return -1;
        }
      }

      if (songTitleA > songTitleB) {
        if (this.sortNameDesc) {
          return -1;
        } else {
          return 1;
        }
      } 
      return 0;
    });
    this.setTableDataSource(this.filteredData);
  }

  resetPlaylist() {
    this.playlist = [];
    this.currentPlaylistIndex = 1;
  }
}
