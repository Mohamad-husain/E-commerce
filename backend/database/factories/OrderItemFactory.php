<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id'   => Order::inRandomOrder()->first()?->id ?? 1,
            'product_id' => Product::inRandomOrder()->first()?->id ?? 1,
            'quantity'   => $this->faker->numberBetween(1, 5),
            'price'      => $this->faker->randomFloat(2, 10, 200),
            'size'       => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
            'color'      => $this->faker->safeColorName(),
        ];
    }
}
