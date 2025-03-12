import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoaded = false;
  isScrolled = false;

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private router: Router) {}

  navigateTo(link: string) {
    console.log(link);
    this.router.navigate([link]);
    this.isMenuOpen = false;
  }

  menuItems = [
    { label: 'login', link: '/auth/login' },
    { label: 'signup', link: '/auth/signup' },
    { label: ' landing page ', link: '/' },
    { label: 'login', link: '/auth/login' },
    { label: 'signup', link: '/auth/signup' },
    { label: ' landing page ', link: '/' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 600;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const target = event.target as HTMLElement;
    const isClickInsideNavbar = target.closest('.navbar') !== null;
    const isClickInsideSidebar = target.closest('.menu-sidebar') !== null;

    if (!isClickInsideNavbar && !isClickInsideSidebar && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
