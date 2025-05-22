import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-scroll-probability-page',
  imports: [SharedModule],
  templateUrl: './scroll-probability-page.component.html',
  styleUrl: './scroll-probability-page.component.css'
})
export class ScrollProbabilityPageComponent {
  constructor(private http: HttpClient) {}

  scrollImg: string = "";
  data: any[] = [];
  slots: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ngOnInit() {
    
    
  }

  getData() {
    // fetch data from maplestory IO
  }

}
