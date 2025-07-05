<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->word(),
            'price'       => $this->faker->numberBetween(10, 500),
            'image'       => 'default.jpg',
            'discount'    => $this->faker->numberBetween(0, 30),
            'size'        => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
            'color'       => $this->faker->safeColorName(),
            'status'      => $this->faker->randomElement(['Available', 'Out of Stock']),
            'category_id' => 1,
        ];
    }
}
