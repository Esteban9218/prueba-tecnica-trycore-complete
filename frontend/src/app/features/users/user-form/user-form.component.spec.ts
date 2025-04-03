import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    // Creamos espías para los servicios
    userServiceSpy = jasmine.createSpyObj('UserService', ['createUser']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        UserFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        provideHttpClient(withFetch()) // Nueva forma recomendada para HttpClient
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente en user-form', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores vacíos', () => {
    expect(component.userForm.value).toEqual({
      name: '',
      email: '',
      role: ''
    });
  });

  it('debería marcar el formulario como inválido si está vacío', () => {
    expect(component.userForm.valid).toBeFalse();
  });

  it('debería validar correctamente el campo de email', () => {
    let emailControl = component.userForm.controls['email'];

    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();

    emailControl.setValue('texto-invalido');
    expect(emailControl.valid).toBeFalse();

    emailControl.setValue('usuario@example.com');
    expect(emailControl.valid).toBeTrue();
  });

  it('debería llamar a createUser del servicio al enviar el formulario con datos válidos', () => {
    // Simulamos un usuario válido
    component.userForm.setValue({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'desarrollador'
    });

    userServiceSpy.createUser.and.returnValue(of({ message: 'Usuario creado' }));

    component.onSubmit();

    expect(userServiceSpy.createUser).toHaveBeenCalledOnceWith({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'desarrollador'
    });

    expect(matDialogSpy.open).toHaveBeenCalledWith(AlertDialogComponent, {
      data: { message: 'Usuario creado exitosamente' }
    });
  });

  it('debería mostrar un diálogo de error si el servicio falla', () => {
    component.userForm.setValue({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'desarrollador'
    });

    userServiceSpy.createUser.and.returnValue(throwError(() => new Error('Error al crear usuario')));

    component.onSubmit();

    expect(userServiceSpy.createUser).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalledWith(AlertDialogComponent, {
      data: {
        icon: 'error',
        title: 'ERROR!',
        message: 'Error al crear el usuario'
      }
    });
  });
});
