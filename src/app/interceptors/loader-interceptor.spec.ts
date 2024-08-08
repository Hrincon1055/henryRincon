import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoaderService } from '../infrastruture/ui/app.loader.service';
import { LoaderInterceptor } from './loader-interceptor.service';
type ConfirmationType = 'success' | 'warn' | 'error';

describe('LoaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderInterceptor,
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(LoaderService);
  });
  it('should be created', () => {
    const interceptor = TestBed.inject(LoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should add request to the list and show loader', () => {
    const url = '/api/test';
    httpClient.get(url).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    expect(loaderService.isLoading.value).toBeTruthy();
    req.flush({});
    httpTestingController.verify();
  });

  it('should remove request from the list and hide loader on successful response false', () => {
    const url = '/api/test';
    httpClient.get(url).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({});
    expect(!loaderService.isLoading.value).toBeFalsy();
    httpTestingController.verify();
  });
  it('should remove request from the list and hide loader on successful response true', () => {
    const url = '/api/test';
    httpClient.get(url).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush({});
    expect(loaderService.isLoading.value).toBeTruthy();
    httpTestingController.verify();
  });
  it('should remove request from the list and hide loader on error response', () => {
    const url = '/api/test';
    httpClient.get(url).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(loaderService.isLoading.value).toBeFalsy();
      }
    );
    const req = httpTestingController.expectOne(url);
    req.error(new ErrorEvent('Network error', { message: 'error' }));
    httpTestingController.verify();
  });
});
