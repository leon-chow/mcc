import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { POSSIBLE_STATS } from '../../shared/constants';
import { binomialProb, combinations } from '../../utils/math';

export interface PercentageChances {
  statBonus: string;
  percentage: string;
}

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
  dataSource: PercentageChances[] = [];;

  possibleStats = POSSIBLE_STATS;
  scrollImg: string = "";
  data: any[] = [];
  slots: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  shouldDisplayTable: boolean = false;
  
  numOfSlots: number = 0;
  numOfScrollsPerTier: number[] = [0, 0, 0];
  hasMultipleScrollTiers = false;
  scrollTiers: number[] = [0.10, 0.30, 0.60];
  scrollStatBonus: number[] = [5, 3, 2];
  
  scrollStats: string[] = ["", "", ""];
  displayedColumns: string[] = ['statBonus', 'percentage'];
  
  ngOnInit() {
    
  }

  getData() {
    // fetch data from maplestory IO
  }

  calculateOutcomes() {
    const nonZeroElements = this.numOfScrollsPerTier.filter(element => element !== 0)
    const numOfDifferentScrolls = nonZeroElements.length;
    const percentageChances: PercentageChances[] = [];
    
    // individual scrolls
    for (let i = 0; i < this.numOfScrollsPerTier.length; i++) {
      if (this.numOfScrollsPerTier[i] > 0) {
        for (let j = 0; j <= this.numOfScrollsPerTier[i]; j++) {
          const percentage = `${(binomialProb(this.numOfScrollsPerTier[i], j, this.scrollTiers[i]) * 100).toPrecision(4)}%`;
          const statBonus = `${(j) * this.scrollStatBonus[i]} ${this.scrollStats[i]}`;
          percentageChances.push({statBonus, percentage})
        }
      }
    }

    // combined chances
    // need to loop through each scroll tier and list all of the combinations, i.e 0x, 0y, 0z then 0x 0y, 2z, ... ax, by, cz
    const combinations = [];
    if (numOfDifferentScrolls > 1) {
      for (let i = 0; i < this.numOfScrollsPerTier.length; i++) {
        if (this.numOfScrollsPerTier[i] > 0) {
          combinations.push(this.numOfScrollsPerTier[i]);
          for (let j = 0; j < combinations.length; j++) {
            for (let k = 0; k < combinations[k]; k++) {
              const percentage = `${(binomialProb(this.numOfScrollsPerTier[i], j, this.scrollTiers[i]) * 100).toPrecision(2)}%`;
              const statBonus = `${j === 0 || j === this.numOfScrollsPerTier[i] ? '' : 'At least'} ${(j) * this.scrollStatBonus[i]} ${this.scrollStats[i]}`;
              percentageChances.push({statBonus, percentage})
            }
          }
        }
      }
    }
    
    return percentageChances
  }

  displayTable() {
    this.shouldDisplayTable = true;
    // TODO: Calculate percentages, then display it as a data source for the table
    const tableDataSource: PercentageChances[] = this.calculateOutcomes();
    this.dataSource = tableDataSource;
  }
}
