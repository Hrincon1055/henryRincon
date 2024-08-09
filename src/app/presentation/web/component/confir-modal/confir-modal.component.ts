import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confir-modal',
  templateUrl: './confir-modal.component.html',
  styleUrls: ['./confir-modal.component.css'],
})
export class ConfirModalComponent {
  @Input() productTitle: string = '';
  @Output() onClose = new EventEmitter<boolean>();

  public confirmDelete(): void {
    this.onClose.emit(true);
  }

  public cancel(): void {
    this.onClose.emit(false);
  }
}
