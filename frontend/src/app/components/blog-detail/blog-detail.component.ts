import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogPost: any;

  blogData = [
    {
      id: 1,
      title: 'Styling Tips for This Summer',
      image: 'assets/images/blog1.jpg',
      content: `This summer, bright and light colors such as white, blue, and beige are trending the most.
Choose breathable fabrics and pair neutral tones with vibrant accessories to complete your look.`
    },
    {
      id: 2,
      title: 'Behind the Scenes: How We Select Our Products',
      image: 'assets/images/blog2.jpg',
      content: `Our expert team keeps track of the latest fashion trends and thoroughly tests the quality of every product we offer.
We ensure that each item meets our standards before adding it to our store.`
    },
    {
      id: 3,
      title: 'Top Seasonal Deals You Shouldn’t Miss!',
      image: 'assets/images/blog3.jpg',
      content: `Every season, we bring you exclusive discounts on selected items to help you save while staying stylish.
Don't miss out on these limited-time opportunities!`
    }
  ];

  constructor(private route: ActivatedRoute) {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPost = this.blogData.find(post => post.id === postId);
  }

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }
}
