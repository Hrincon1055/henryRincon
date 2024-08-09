import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() statusAlert: 'error' | 'exito' | '' = '';
  @Input() messageAlert: string = '';
  @Input() isActiveAlert: boolean = false;
}
