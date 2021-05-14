import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalComponent } from './dialog-modal.component';

describe('DialogModalComponent Interface', () => {
  let component: DialogModalComponent;
  let fixture: ComponentFixture<DialogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a modal container', () => {
    const element = fixture.nativeElement.querySelector('.modal-container');
    expect(element).toBeTruthy();
  });

  it('should have a modal with message and two buttons, one to cancel and another to continue', () => {
    const modal = fixture.nativeElement.querySelector('.modal');
    const message = modal.querySelector('.message');
    const cancelButton = modal.querySelector('.cancel-button');
    const continueButton = modal.querySelector('.continue-button');

    expect(modal).toBeTruthy();
    expect(message).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    expect(continueButton).toBeTruthy();

    expect(message.textContent).toBe('Tem certeza que deseja ir para tela?');
    expect(cancelButton.textContent).toBe('Não');
    expect(continueButton.textContent).toBe('Sim');
  });
});
