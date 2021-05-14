import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../company.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  companies: Company[] = [];
  suggestions: Company[] = [];
  searching: Boolean = false;

  constructor(private companyService: CompanyService) {}

  async ngOnInit(): Promise<Company[]> {
    this.companies = await this.companyService.getCompanies();
    return this.companies;
  }

  onSearch(value: string): void {
    if (value.length > 0) this.searching = true;
    else this.searching = false;

    if (this.searching) {
      const suggestions = this.companies.filter((all) =>
        all.shortName.toLowerCase().includes(value.toLowerCase())
      );
      this.suggestions = suggestions;
    }
    this.companyService.setSuggestions(<Company[]>[]);
  }

  onSubmit(event: any, search: string): void {
    event.preventDefault();
    if (search.length <= 0) this.suggestions = [];
    this.companyService.setSuggestions(this.suggestions);
  }

  onClickSuggestion(shortName: string): void {
    this.searching = false;
    const suggestions = this.companies.filter((all) =>
      all.longName.toLowerCase().includes(shortName.toLowerCase())
    );
    this.companyService.setSuggestions(suggestions);
  }
}
