<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
class ProductVariationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'color' => $this->faker->safeColorName(),
            'size' => $this->faker->randomElement(['S', 'M', 'L', 'XL', '39', '40', '41', '42']),
            'quantity' => $this->faker->numberBetween(0, 30),
        ];
    }
}
