import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { TaskService } from '../../../services/task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        UserService,
        TaskService,
        provideHttpClient(withFetch())
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente en task-list', () => {
    expect(component).toBeTruthy();
  });
});
