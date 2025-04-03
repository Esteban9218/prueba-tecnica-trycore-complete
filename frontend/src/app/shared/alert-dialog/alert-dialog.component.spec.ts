import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertDialogComponent } from './alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogComponent], // Importar standalone component
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } // Mock MAT_DIALOG_DATA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
