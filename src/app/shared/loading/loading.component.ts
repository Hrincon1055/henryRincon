import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../infrastruture/ui/app.loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnDestroy {
  public loading!: boolean;
  private isLoading$!: Subscription;
  constructor(private _loaderService: LoaderService) {
    this.isLoading$ = this._loaderService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }
  ngOnDestroy(): void {
    if (this.isLoading$) this.isLoading$.unsubscribe();
  }
}
