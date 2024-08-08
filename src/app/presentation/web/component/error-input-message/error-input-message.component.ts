import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-input-message',
  templateUrl: './error-input-message.component.html',
  styleUrls: ['./error-input-message.component.css'],
})
export class ErrorInputMessageComponent {
  @Input() message: string = '';
}
