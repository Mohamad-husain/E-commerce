import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts = [
    {
      id: 1,
      title: 'Styling Tips for This Summer',
      excerpt: 'Discover how to pick comfortable and stylish summer colors for every occasion...',
      image: 'assets/images/blog1.jpg'
    },
    {
      id: 2,
      title: 'Behind the Scenes: How We Select Our Products',
      excerpt: 'Take an exclusive look inside the Coloshop product curation and design team...',
      image: 'assets/images/blog2.jpg'
    },
    {
      id: 3,
      title: 'Top Seasonal Deals You Shouldn’t Miss!',
      excerpt: 'Each new season brings exciting opportunities. Explore our special offers...',
      image: 'assets/images/blog3.jpg'
    }
  ];

  ngOnInit(): void {
    AOS.init({ duration: 800, once: true });
  }
}
