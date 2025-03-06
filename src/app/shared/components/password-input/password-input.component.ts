import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  template: `
    <div class="mb-2 position-relative">
      <input
        [type]="passwordFieldType"
        class="form-control form-control-lg w-100"
        [placeholder]="placeholder"
        [formControlName]="formControlName"
        (input)="onInputChange($event)"
      />
      <span class="password-toggle-icon" (click)="togglePasswordVisibility()">
        <img [src]="eyeIconSrc" alt="eye icon" style="width: 20px;" />
      </span>
    </div>
  `,
  styles: [
    `
      .password-toggle-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #6c757d;
      }

      .form-control-lg {
        border-color: rgb(210, 214, 218) !important;
        color: rgba(0, 0, 0, 0.767) !important;
        font-weight: 400;
        font-size: 16px !important;
        padding: 10px !important;

        &::placeholder {
          color: rgba(0, 0, 0, 0.3) !important;
          font-size: 14px !important;
        }
      }

      .form-control-lg:focus {
        border-color: rgb(182, 196, 211) !important;
        box-shadow: 2px 2px 2px rgba(0, 57, 163, 0.158);
      }
    `,
  ],
  providers: [
    {
      // این بخش به Angular می‌گوید که این کامپوننت یک ControlValueAccessor است
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent), // ارجاع به کلاس کامپوننت
      multi: true, // اجازه می‌دهد چندین provider برای NG_VALUE_ACCESSOR وجود داشته باشد
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Password';
  @Input() formControlName: string = 'password';

  passwordFieldType: string = 'password';
  eyeIconSrc: string = 'assets/icons/eye-slash.svg';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    //این متد زمانی فراخوانی می‌شود که مقدار فیلد از خارج تغییر کند
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    // هر زان مقدار فیلد تغییر کرد فراخانی میشود
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    // لمش کرد فراخانی میشود
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIconSrc =
      this.passwordFieldType === 'password'
        ? 'assets/icons/eye-slash.svg'
        : 'assets/icons/eye.svg';
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value); // مقدار جدید را به Reactive Forms منتقل می‌کند.
    this.onTouched(); // وضعیت "touched" را به‌روزرسانی می‌کند.
  }
}
