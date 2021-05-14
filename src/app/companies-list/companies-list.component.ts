import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company, CompanyService } from '../company.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent implements OnInit, OnDestroy {
  suggestions: Company[] = [];
  subscription: Subscription = new Subscription();
  displayAboutCompanyId: number = 0;
  openModal: Boolean = false;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.subscription = this.companyService.currentMessage.subscribe(
      (companies) => {
        this.suggestions = companies;
        this.displayAboutCompanyId = 0;
      }
    );
  }

  onClickCompany(id: number) {
    if (this.displayAboutCompanyId === id) this.displayAboutCompanyId = 0;
    else this.displayAboutCompanyId = id;
  }

  setOpenModal(open: boolean): void {
    this.openModal = open;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
