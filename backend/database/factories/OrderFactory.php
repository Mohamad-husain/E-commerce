<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'total_price' => $this->faker->numberBetween(50, 500),
            'status' => 'Confirmed',
        ];
    }
}
