import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  codeDigits: string[] = ['', '', '', '', '', ''];

  trackByIndex(index: number): number {
    return index;
  }

  onInput(index: number, event: any) {
    const input = event.target;
    const value = input.value;

    if (value.length > 1) {
      input.value = value.charAt(0);
      this.codeDigits[index] = value.charAt(0);
    }

    if (value && index < this.codeDigits.length - 1) {
      const nextInput = input.parentElement.querySelectorAll('input')[index + 1];
      if (nextInput) nextInput.focus();
    }
  }
}
