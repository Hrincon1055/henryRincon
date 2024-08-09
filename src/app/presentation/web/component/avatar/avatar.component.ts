import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnChanges {
  @Input() name: string = '';
  initials: string = '';
  OnChanges: any;

  ngOnChanges(): void {
    this.initials = this.getInitials(this.name);
  }

  public getInitials(name: string): string {
    if (!name) return '';
    const words = name.split(' ');
    const initials = words
      .map((word) => word.charAt(0))
      .join('')
      .slice(0, 2);
    return initials;
  }
}
