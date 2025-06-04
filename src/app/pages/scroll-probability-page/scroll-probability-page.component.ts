import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { POSSIBLE_STATS } from '../../shared/constants';
import { combinations } from '../../utils/math';

export interface PercentageChances {
  statBonus: string;
  percentage: string;
}

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
  dataSource: PercentageChances[] = [];;

  possibleStats = POSSIBLE_STATS;
  scrollImg: string = "";
  data: any[] = [];
  slots: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  shouldDisplayTable: boolean = false;
  
  numOfSlots: number = 0;
  numOfScrollsPerTier: number[] = [0, 0, 0];
  scrollNums: number[] = [0, 0, 0];
  scrollTiers: number[] = [0.10, 0.30, 0.60]
  
  scrollStats: string[] = ["", "", ""];
  displayedColumns: string[] = ['statBonus', 'percentage'];
  
  ngOnInit() {
    
  }

  getData() {
    // fetch data from maplestory IO
  }

  getProbabilityFormula(i: number, j: number, numOfScrolls: number) {
    return `${(((combinations(numOfScrolls, j) * (Math.pow(this.scrollTiers[i], j))) * (Math.pow(1 - this.scrollTiers[i], numOfScrolls - j))) * 100).toFixed(2)}%`;
  }

  createCombinations() {
    const sum = this.numOfScrollsPerTier.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    const percentageChances: PercentageChances[] = [];
    for (let i = 0; i < this.numOfScrollsPerTier.length; i++) {
      if (this.numOfScrollsPerTier[i] > 0) {
        for (let j = 0; j <= this.numOfScrollsPerTier[i]; j++) {
          const percentage = this.getProbabilityFormula(i, j, sum);
          const statBonus = `${(j) * 2} ${this.scrollStats[i]}`;
          percentageChances.push({statBonus, percentage})
        }
      }
    }
    return percentageChances;
  }

  displayTable() {
    this.shouldDisplayTable = true;
    // TODO: Calculate percentages, then display it as a data source for the table
    const tableDataSource: PercentageChances[] = this.createCombinations();
    this.dataSource = tableDataSource;
  }
}
