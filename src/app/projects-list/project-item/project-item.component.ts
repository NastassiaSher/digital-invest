import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectItem} from '../../models/project-item.model';
import {InvestmentData} from '../../models/investment-data.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  project: ProjectItem;
  @Input()
  itemIndex: number;
  progressValue: number;
  investInput: string;
  @ViewChild('iInput', {static: false}) input: ElementRef;
  maxInpLength: number;
  showInputError = false;
  @Output() investToEmit = new EventEmitter<InvestmentData>();

  constructor() { }

  ngOnInit(): void {
    this.calculateProgressBarValue();
    this.calculateMaxInpLength();
    this.investInput = this.project.minInvestment.toString();
  }

  calculateProgressBarValue(): void {
    const percents = 100 - this.project.availableAmount * 100 / this.project.totalAmount;
    if (percents < 100 && percents > 99) {
      this.progressValue = 99;
    } else {
      this.progressValue = Math.trunc(percents);
    }
  }

  calculateMaxInpLength(): void {
    this.maxInpLength = this.project.maxInvestment.toString().length;
  }

  reduceInvAmount() {
    const inpValue = this.input.nativeElement.value;
    if (+inpValue - 100 >= this.project.minInvestment) {
      this.investInput = (+inpValue - 100).toString();
    }
  }

  increaseInvAmount() {
    const inpValue = this.input.nativeElement.value;
    if (+inpValue + 100 <= this.project.maxInvestment) {
      this.investInput = (+inpValue + 100).toString();
    }
  }

  inputChanged(input) {
    this.investInput = input.target.value;
    if (this.investInput === '') {
      this.investInput = '0';
    } else {
      this.checkInput(this.investInput);
    }
  }

  checkInput(value): void {
    if (!this.validate(value)) {
      this.investInput = value.slice(0, -1);
      this.input.nativeElement.value = this.investInput;
    }
  }

  private validate(s) {
    const rgx = /^[0-9]*?[0-9]*$/;
    return s.match(rgx);
  }

  invest() {
    // check if amount is valid
    // TODO check if user logged in in authentic.service!!!
    if (+this.investInput < this.project.maxInvestment &&
      +this.investInput > this.project.minInvestment &&
      +this.investInput < this.project.availableAmount) {
      this.investToEmit.emit({projectId: this.project.projectId, investedAmount: +this.investInput});
    } else {
      this.showInputError = true;
    }
  }


}
