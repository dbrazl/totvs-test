import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../company.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  companies: Company[] = [];
  searching: Boolean = false;
  suggestions: Company[] = [];

  constructor(private companyService: CompanyService) {}

  async ngOnInit(): Promise<Company[]> {
    this.companies = await this.companyService.getCompanies();
    return this.companies;
  }

  onSearch(value: string): void {
    if (value.length > 0) this.searching = true;
    else this.searching = false;

    if (this.searching)
      this.suggestions = this.companies.filter((all) =>
        all.longName.toLowerCase().includes(value.toLowerCase())
      );
  }

  onClickSuggestion(): void {
    this.searching = false;
  }
}
