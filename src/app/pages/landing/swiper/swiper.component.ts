import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import Swiper from 'swiper'; // Import Swiper core
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Mousewheel,
} from 'swiper/modules'; // Import Swiper modules

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimize change detection
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiper', { static: false }) swiperContainer!: ElementRef;
  swiper!: Swiper;

  // Dynamic slide data (can be fetched from a service)
  slides = [
    { image: '../../../assets/images/seebandw.jpg', alt: 'Slide 1' },
    { image: '../../../assets/images/seebandw.jpg', alt: 'Slide 2' },
    { image: '../../../assets/images/seebandw.jpg', alt: 'Slide 3' },
    { image: '../../../assets/images/seebandw.jpg', alt: 'Slide 4' },
    { image: '../../../assets/images/seebandw.jpg', alt: 'Slide 5' },
  ];

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }

  private initializeSwiper(): void {
    // Register Swiper modules
    Swiper.use([Navigation, Pagination, Autoplay, Keyboard, Mousewheel]);

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        enabled: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }
}
