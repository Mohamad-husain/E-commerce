import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-color-harmony',
  standalone: true,
  templateUrl: './color-harmony.component.html',
  styleUrls: ['./color-harmony.component.css'],
  imports: [NgForOf]
})
export class ColorHarmonyComponent implements OnInit {
  ngOnInit(): void {
    AOS.init({ duration: 700, once: true });
  }

  outfitPalettes = [
    {
      name: 'Sunset Vibes',
      outfit: [
        { type: 'Shirt', color: '#FF6B6B', colorName: 'Coral' },
        { type: 'Pants', color: '#FFA69E', colorName: 'Peach' },
        { type: 'Shoes', color: '#FFD3B6', colorName: 'Sand' },
        { type: 'Jacket', color: '#FFF1E6', colorName: 'Cream' }
      ]
    },
    {
      name: 'Ocean Breeze',
      outfit: [
        { type: 'Shirt', color: '#1A374D', colorName: 'Navy' },
        { type: 'Pants', color: '#406882', colorName: 'Blue Gray' },
        { type: 'Shoes', color: '#6998AB', colorName: 'Sky' },
        { type: 'Jacket', color: '#B1D0E0', colorName: 'Light Sky' }
      ]
    },
    {
      name: 'Modern Neutrals',
      outfit: [
        { type: 'Shirt', color: '#2C2C2C', colorName: 'Charcoal' },
        { type: 'Pants', color: '#474747', colorName: 'Slate Gray' },
        { type: 'Shoes', color: '#9E9E9E', colorName: 'Warm Gray' },
        { type: 'Jacket', color: '#F6F6F6', colorName: 'Ivory' }
      ]
    },
    {
      name: 'Spring Blossom',
      outfit: [
        { type: 'Shirt', color: '#FFB7C5', colorName: 'Cherry Blossom' },
        { type: 'Pants', color: '#E0BBE4', colorName: 'Lavender' },
        { type: 'Shoes', color: '#957DAD', colorName: 'Orchid' },
        { type: 'Jacket', color: '#D291BC', colorName: 'Plum' }
      ]
    },
    {
      name: 'Earth Tones',
      outfit: [
        { type: 'Shirt', color: '#A0522D', colorName: 'Sienna' },
        { type: 'Pants', color: '#CD853F', colorName: 'Peru' },
        { type: 'Shoes', color: '#DEB887', colorName: 'Burlywood' },
        { type: 'Jacket', color: '#F5DEB3', colorName: 'Wheat' }
      ]
    },
    {
      name: 'Berry Crush',
      outfit: [
        { type: 'Shirt', color: '#800020', colorName: 'Burgundy' },
        { type: 'Pants', color: '#C71585', colorName: 'Medium Violet' },
        { type: 'Shoes', color: '#DB7093', colorName: 'Pale Violet Red' },
        { type: 'Jacket', color: '#FFC0CB', colorName: 'Pink' }
      ]
    },
    {
      name: 'Fresh Mint',
      outfit: [
        { type: 'Shirt', color: '#98FF98', colorName: 'Mint Green' },
        { type: 'Pants', color: '#00FA9A', colorName: 'Medium Spring Green' },
        { type: 'Shoes', color: '#40E0D0', colorName: 'Turquoise' },
        { type: 'Jacket', color: '#E0FFFF', colorName: 'Light Cyan' }
      ]
    },
    {
      name: 'Vintage Rose',
      outfit: [
        { type: 'Shirt', color: '#C08081', colorName: 'Antique Rose' },
        { type: 'Pants', color: '#FFD1DC', colorName: 'Pastel Pink' },
        { type: 'Shoes', color: '#F4C2C2', colorName: 'Baby Pink' },
        { type: 'Jacket', color: '#FFE4E1', colorName: 'Misty Rose' }
      ]
    },
    {
      name: 'Autumn Spice',
      outfit: [
        { type: 'Shirt', color: '#D2691E', colorName: 'Chocolate' },
        { type: 'Pants', color: '#FF7F50', colorName: 'Coral' },
        { type: 'Shoes', color: '#FF8C00', colorName: 'Dark Orange' },
        { type: 'Jacket', color: '#FFE4B5', colorName: 'Moccasin' }
      ]
    },
    {
      name: 'Winter Night',
      outfit: [
        { type: 'Shirt', color: '#2F4F4F', colorName: 'Dark Slate Gray' },
        { type: 'Pants', color: '#708090', colorName: 'Slate Gray' },
        { type: 'Shoes', color: '#778899', colorName: 'Light Slate Gray' },
        { type: 'Jacket', color: '#D3D3D3', colorName: 'Light Gray' }
      ]
    },
    {
      name: 'Tropical Punch',
      outfit: [
        { type: 'Shirt', color: '#FF4500', colorName: 'Orange Red' },
        { type: 'Pants', color: '#FFD700', colorName: 'Gold' },
        { type: 'Shoes', color: '#ADFF2F', colorName: 'Green Yellow' },
        { type: 'Jacket', color: '#00CED1', colorName: 'Dark Turquoise' }
      ]
    },
    {
      name: 'Classic Black & White',
      outfit: [
        { type: 'Shirt', color: '#000000', colorName: 'Black' },
        { type: 'Pants', color: '#333333', colorName: 'Charcoal' },
        { type: 'Shoes', color: '#666666', colorName: 'Gray' },
        { type: 'Jacket', color: '#FFFFFF', colorName: 'White' }
      ]
    }
  ];
}
