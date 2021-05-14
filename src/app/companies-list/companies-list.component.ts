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

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.subscription = this.companyService.currentMessage.subscribe(
      (companies) => (this.suggestions = companies)
    );
  }

  onClickCompany(id: number) {
    if (this.displayAboutCompanyId === id) this.displayAboutCompanyId = 0;
    else this.displayAboutCompanyId = id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
