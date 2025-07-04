import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import AOS from 'aos';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs = [
    {
      question: 'What payment methods are available?',
      answer: 'We accept credit cards (Visa / MasterCard) and cash on delivery.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping usually takes 3 to 5 business days within the country.'
    },
    {
      question: 'Can I return a product?',
      answer: 'Yes, you can return the product within 14 days of receipt if it is in its original condition.'
    },
    {
      question: 'Is shipping free?',
      answer: 'Yes, shipping is free for orders over 200 ILS.'
    },
    {
      question: 'How can I contact you?',
      answer: 'You can contact us through the "Contact Us" page or send an email to support@eshop.com.'
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'You can modify the order within one hour of confirmation by contacting our support team.'
    }
  ];

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Frequently Asked Questions - E-Shop');
    AOS.init({ duration: 600, once: true });
  }
}
