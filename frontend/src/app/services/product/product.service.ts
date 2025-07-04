import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    {
      id: 1,
      name: 'Elegant Jacket',
      category: 'Women',
      size: 'M',
      color: 'Red',
      price: 85,
      image: 'assets/images/product1.jpg',
      images: ['assets/images/product1.jpg', 'assets/images/product2.jpg'],
      sizes: ['S', 'M', 'L'],
      colors: ['#000', '#8B0000'],
      description: 'Premium jacket perfect for winter.',
      reviews: [{ user: 'Ahmad', rating: 5, comment: 'Excellent quality!' }]
    },
    {
      id: 2,
      name: 'Casual Sneakers',
      category: 'Men',
      size: 'L',
      color: 'Blue',
      price: 75,
      image: 'assets/images/product2.jpg',
      images: ['assets/images/product2.jpg', 'assets/images/product1.jpg'],
      sizes: ['38', '39', '40'],
      colors: ['#FFF', '#000'],
      description: 'Comfortable sneakers for walking.',
      reviews: [{ user: 'Rania', rating: 4, comment: 'Looks nice and fits well.' }]
    },
    {
      id: 3,
      name: 'Stylish Hoodie',
      category: 'Accessories',
      size: 'One Size',
      color: 'Brown',
      price: 65,
      image: 'assets/images/product3.jpg',
      images: ['assets/images/product3.jpg', 'assets/images/product2.jpg'],
      sizes: ['M', 'L', 'XL'],
      colors: ['#333333', '#FF0000', '#00CED1'],
      description: 'Comfortable and stylish hoodie.',
      reviews: [
        { user: 'Sara', rating: 5, comment: 'Love it!' },
        { user: 'Omar', rating: 5, comment: 'Very cool hoodie.' }
      ]
    },
    {
      id: 4,
      name: 'Leather Handbag',
      category: 'Accessories',
      size: 'One Size',
      color: 'Black',
      price: 95,
      image: 'assets/images/product4.jpg',
      images: ['assets/images/product4.jpg'],
      sizes: ['One Size'],
      colors: ['#000'],
      description: 'Elegant leather handbag with gold details.',
      reviews: []
    },
    {
      id: 5,
      name: 'Floral Summer Dress',
      category: 'Women',
      size: 'S',
      color: 'Blue',
      price: 55,
      image: 'assets/images/product5.jpg',
      images: ['assets/images/product5.jpg'],
      sizes: ['S', 'M'],
      colors: ['#0000FF', '#87CEEB'],
      description: 'Lightweight floral dress for summer.',
      reviews: []
    },
    {
      id: 6,
      name: 'Slim Fit Jeans',
      category: 'Men',
      size: 'M',
      color: 'Blue',
      price: 60,
      image: 'assets/images/product6.jpg',
      images: ['assets/images/product6.jpg'],
      sizes: ['S', 'M', 'L'],
      colors: ['#0000CD'],
      description: 'Trendy slim fit denim jeans.',
      reviews: []
    },
    {
      id: 7,
      name: 'Summer Hat',
      category: 'Accessories',
      size: 'One Size',
      color: 'Beige',
      price: 30,
      image: 'assets/images/product7.jpg',
      images: ['assets/images/product7.jpg'],
      sizes: ['One Size'],
      colors: ['#F5F5DC'],
      description: 'Protect yourself from the sun in style.',
      reviews: []
    },
    {
      id: 8,
      name: 'Running Shoes',
      category: 'Men',
      size: 'XL',
      color: 'Black',
      price: 90,
      image: 'assets/images/product8.jpg',
      images: ['assets/images/product8.jpg'],
      sizes: ['L', 'XL'],
      colors: ['#000000'],
      description: 'Lightweight and supportive running shoes.',
      reviews: []
    },
    {
      id: 9,
      name: 'Fashion T-shirt',
      category: 'New',
      size: 'L',
      color: 'White',
      price: 35,
      image: 'assets/images/product9.jpg',
      images: ['assets/images/product9.jpg'],
      sizes: ['M', 'L', 'XL'],
      colors: ['#FFFFFF'],
      description: 'Soft cotton T-shirt with modern design.',
      reviews: []
    },
    {
      id: 1,
      name: 'Elegant Jacket',
      category: 'Women',
      size: 'M',
      color: 'Red',
      price: 85,
      image: 'assets/images/product1.jpg',
      images: ['assets/images/product1.jpg', 'assets/images/product2.jpg'],
      sizes: ['S', 'M', 'L'],
      colors: ['#000', '#8B0000'],
      description: 'Premium jacket perfect for winter.',
      reviews: [{ user: 'Ahmad', rating: 5, comment: 'Excellent quality!' }]
    },{
      id: 1,
      name: 'Elegant Jacket',
      category: 'Women',
      size: 'M',
      color: 'Red',
      price: 85,
      image: 'assets/images/product1.jpg',
      images: ['assets/images/product1.jpg', 'assets/images/product2.jpg'],
      sizes: ['S', 'M', 'L'],
      colors: ['#000', '#8B0000'],
      description: 'Premium jacket perfect for winter.',
      reviews: [{ user: 'Ahmad', rating: 5, comment: 'Excellent quality!' }]
    },{
      id: 1,
      name: 'Elegant Jacket',
      category: 'Women',
      size: 'M',
      color: 'Red',
      price: 85,
      image: 'assets/images/product1.jpg',
      images: ['assets/images/product1.jpg', 'assets/images/product2.jpg'],
      sizes: ['S', 'M', 'L'],
      colors: ['#000', '#8B0000'],
      description: 'Premium jacket perfect for winter.',
      reviews: [{ user: 'Ahmad', rating: 5, comment: 'Excellent quality!' }]
    },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }
}
