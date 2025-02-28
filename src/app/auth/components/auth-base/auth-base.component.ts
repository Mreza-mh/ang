import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
})
export class AuthBaseComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imgSrc: string = '';
  @Input() imgTitle: string = '';
  @Input() imgSubtitle: string = '';
}
