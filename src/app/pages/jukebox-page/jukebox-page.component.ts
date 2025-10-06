import { Component, ViewChild } from '@angular/core';
import { MusicServiceService } from '../../services/music-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-jukebox-page',
  imports: [MatTableModule, MatPaginator, MatPaginatorModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './jukebox-page.component.html',
  styleUrl: './jukebox-page.component.css'
})
export class JukeboxPageComponent {
  constructor(private musicService: MusicServiceService) {}
  
  musicData: any = [];
  searchInput: string = "";
  displayedColumns: string[] = ['songName', 'description', 'date', 'folder'];
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;
  musicTableDataSource = new MatTableDataSource();
  
  ngOnInit() {
    this.musicService.getMusicData().subscribe(data => {
      this.musicData = data;
      this.musicTableDataSource = new MatTableDataSource(this.musicData);
      this.musicTableDataSource.paginator = this.paginator;
    })
  }

   onSearchChange(searchEvent: Event) {
    this.musicTableDataSource.filterPredicate = (data: any, filter: string) => {
      return data.metadata.title.toLowerCase().includes(filter);
    };
    const value = ((searchEvent.target) as HTMLInputElement).value
    this.musicTableDataSource.filter = value.trim().toLowerCase();
    if (this.musicTableDataSource.paginator) {
      this.musicTableDataSource.paginator.firstPage();
    }
  }

  playSong(song: string) {
    console.log(song);
  }
}
