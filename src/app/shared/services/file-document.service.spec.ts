import { TestBed } from '@angular/core/testing';

import { FileDocumentService } from './file-document.service';

describe('FileDocumentService', () => {
  let service: FileDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
