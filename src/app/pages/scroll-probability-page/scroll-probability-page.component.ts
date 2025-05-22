import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-scroll-probability-page',
  imports: [],
  templateUrl: './scroll-probability-page.component.html',
  styleUrl: './scroll-probability-page.component.css'
})
export class ScrollProbabilityPageComponent {
  constructor(private http: HttpClient) {}

  scrollImg: string = "";
  data: any[] = [];
  ngOnInit() {
    
    
  }

  getData() {
    // fetch data from maplestory IO
  }

}
