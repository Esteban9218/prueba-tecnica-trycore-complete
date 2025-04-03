import { TestBed } from '@angular/core/testing';

import { TaskNotifierService } from './task-notifier.service';

describe('TaskNotifierService', () => {
  let service: TaskNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
