import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-scroll-probability-page',
  imports: [SharedModule, MatInputModule],
  templateUrl: './scroll-probability-page.component.html',
  styleUrl: './scroll-probability-page.component.css'
})
export class ScrollProbabilityPageComponent {
  constructor(private http: HttpClient) {}

  scrollImg: string = "";
  data: any[] = [];
  slots: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // availableScrollPercentages: number[] = [10, 60, 70, 30]
  numOfSlots: number = 0;
  numOfScrollsPerTier: number[] = [0, 0, 0];
  scrollNums: number[] = [0, 0, 0];
  
  scrollStats: string[] = ["", "", ""];

  possibleStats: string[] = ["STR", "DEX", "INT", "LUK", "W.ATK", "M.ATK", "Speed", "Jump", "Acc", "Avoid", "HP", "MP", "W.DEF", "M.DEF"]
  
  ngOnInit() {
    
  }

  getData() {
    // fetch data from maplestory IO
  }

  displayTable() {
    // TODO: Display a Mat table with the percentage of each scroll chance
    console.log(this.numOfScrollsPerTier);
    console.log(this.scrollNums);
    console.log(this.scrollStats);
    console.log("displaying table...")
  }

}
