import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectItem} from '../../models/project-item.model';
import {InvestmentData} from '../../models/investment-data.model';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: ProjectItem;
  @Input() itemIndex: number;
  @Input() flag: string;
  progressValue: number;
  investInput: string;
  @ViewChild('iInput', {static: false}) input: ElementRef;
  maxInpLength: number;
  @Output() investToEmit = new EventEmitter<InvestmentData>();

  constructor(private modalService: ModalService) { }

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

  reduceInvAmount(): void {
    const inpValue = this.input.nativeElement.value;
    if (+inpValue - 100 >= this.project.minInvestment) {
      this.investInput = (+inpValue - 100).toString();
    }
  }

  increaseInvAmount(): void {
    const inpValue = this.input.nativeElement.value;
    if (+inpValue + 100 <= this.project.maxInvestment) {
      this.investInput = (+inpValue + 100).toString();
    }
  }

  inputChanged(input): void {
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

  private validate(s): boolean {
    const rgx = /^[0-9]*?[0-9]*$/;
    return s.match(rgx);
  }

  invest(): void {
    // check if amount is valid
    if (+this.investInput < this.project.maxInvestment &&
      +this.investInput >= this.project.minInvestment &&
      +this.investInput <= this.project.availableAmount) {
      this.investToEmit.emit({projectId: this.project.projectId, investedAmount: +this.investInput});
    } else {
      this.modalService.openInfoModal({
        title: 'Investment',
        message: 'Invalid amount!'
      });
    }
  }


}
