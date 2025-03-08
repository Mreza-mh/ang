import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiper', { static: false }) swiperContainer!: ElementRef;
  swiper!: Swiper;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }

  private initializeSwiper(): void {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/auth/signup']);
  }
}
