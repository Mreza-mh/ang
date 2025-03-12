import { Component, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class LandingComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScrol() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 1000;
  }
}



