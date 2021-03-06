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

  async ngOnInit(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
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
    const suggestions = this.companies.filter((all) =>
      all.shortName.toLowerCase().includes(search.toLowerCase())
    );
    this.companyService.setSuggestions(suggestions);
    this.suggestions = [];
  }

  onClickSuggestion(shortName: string): void {
    this.searching = false;
    const suggestions = this.companies.filter((all) =>
      all.shortName.toLowerCase().includes(shortName.toLowerCase())
    );
    this.companyService.setSuggestions(suggestions);
  }
}
