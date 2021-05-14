import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesListComponent } from './companies-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompanyService } from '../company.service';

import expectedCompanies from '../../assets/mocks/companies';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

describe('CompaniesListComponent Interface', () => {
  let component: CompaniesListComponent;
  let fixture: ComponentFixture<CompaniesListComponent>;
  let service: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CompaniesListComponent, DialogModalComponent],
      providers: [CompanyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CompanyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty message when suggestions state are empty', () => {
    const element = fixture.nativeElement.querySelector('.empty-list');
    const img = element.querySelector('.empty-illustration');
    const message = element.querySelector('.empty-message');

    expect(element).toBeTruthy();
    expect(img).toBeTruthy();
    expect(message.textContent).toBe('A busca está vazia.');
  });

  it('should display a list of suggestion when suggestions state have items', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.full-list');
    expect(element).toBeTruthy();
  });

  it('should display a suggestion with short name, logo, long name and button to see action', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const companies = list.querySelectorAll('.company');
    companies.forEach((company: HTMLLIElement, index: any) => {
      const shortName = company.querySelector('.short-name');
      const logo = company.querySelector('.logo');
      const longName = company.querySelector('.long-name');
      const seeActionButton = company.querySelector('.see-action');

      expect(shortName).toBeTruthy();
      expect(logo).toBeTruthy();
      expect(longName).toBeTruthy();
      expect(seeActionButton).toBeTruthy();

      expect(shortName?.textContent).toBe(expectedCompanies[index].shortName);
      expect(logo?.getAttribute('src')).toBe(expectedCompanies[index].logo);
      expect(longName?.textContent).toBe(expectedCompanies[index].longName);

      const seeActionLabel = seeActionButton?.querySelector(
        '.see-action-label'
      );
      const seeActionIcon = seeActionButton?.querySelector('.see-action-icon');
      expect(seeActionLabel).toBeTruthy();
      expect(seeActionIcon).toBeTruthy();
      expect(seeActionLabel?.textContent?.trim()).toBe('Ver detalhe da ação');
      expect(seeActionIcon?.getAttribute('src')).toBe(
        'assets/images/down-arrow.svg'
      );
    });
  });

  it('should display description and a see more button when click over company', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const companies = list.querySelectorAll('.company');
    companies.forEach((company: HTMLLIElement, index: any) => {
      const info = company?.querySelector('.info');
      info?.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const aboutModal = company.querySelector('.about');
      const description = aboutModal?.querySelector('.description');
      const seeMoreButton = aboutModal?.querySelector('.see-more');

      expect(aboutModal).toBeTruthy();
      expect(description).toBeTruthy();
      expect(seeMoreButton).toBeTruthy();
      expect(description?.textContent).toBe(
        expectedCompanies[index]?.description
      );
      expect(seeMoreButton?.textContent).toBe('VER MAIS');
    });
  });

  it('should display about company on click over a company', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const companies = list.querySelectorAll('.company');

    companies.forEach((company: HTMLLIElement, index: any) => {
      if (index === 0) {
        const info = company.querySelector('.info');
        info?.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        const about = company.querySelector('.about');
        expect(about).toBeTruthy();
      } else {
        const about = company.querySelector('.about');
        expect(about).toBeFalsy();
      }
    });
  });

  it('should change see more button label on click over company', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const company = list.querySelectorAll('.company')[0];

    const info = company.querySelector('.info');
    const seeActionButton = info?.querySelector('.see-action');
    expect(seeActionButton?.textContent?.trim()).toBe('Ver detalhe da ação');

    info.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(seeActionButton.textContent?.trim()).toBe('Ocultar detalhe da ação');

    info.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(seeActionButton?.textContent?.trim()).toBe('Ver detalhe da ação');
  });

  it('should open modal on click to see more', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const firstCompany = list.querySelector('.company');
    const info = firstCompany.querySelector('.info');

    info.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const seeMoreButton = firstCompany.querySelector('.about .see-more');
    seeMoreButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const modalContainer = fixture.nativeElement.querySelector(
      '.modal-container'
    );
    expect(modalContainer).toBeTruthy();
  });

  it('should close modal on click over modal container', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const firstCompany = list.querySelector('.company');
    const info = firstCompany.querySelector('.info');

    info.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const seeMoreButton = firstCompany.querySelector('.see-more');
    seeMoreButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const modalContainer = fixture.nativeElement.querySelector(
      '.modal-container'
    );

    expect(modalContainer).toBeTruthy();

    modalContainer.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const afterModalContainer = fixture.nativeElement.querySelector(
      '.modal-container'
    );

    expect(afterModalContainer).toBeFalsy();
  });

  it('should close modal on click over continue or cancel button in modal', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const firstCompany = list.querySelector('.company');
    const info = firstCompany.querySelector('.info');

    info.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const seeMoreButton = firstCompany.querySelector('.see-more');
    seeMoreButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const modal1 = fixture.nativeElement.querySelector('.modal');
    expect(modal1).toBeTruthy();

    const continueButton = modal1.querySelector('.continue-button');
    continueButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const modal1After = fixture.nativeElement.querySelector('.modal');
    expect(modal1After).toBeFalsy();

    seeMoreButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const modal2 = fixture.nativeElement.querySelector('.modal');
    expect(modal2).toBeTruthy();

    const cancelButton = modal2.querySelector('.cancel-button');
    cancelButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const modal2After = fixture.nativeElement.querySelector('.modal');
    expect(modal2After).toBeFalsy();
  });
});
