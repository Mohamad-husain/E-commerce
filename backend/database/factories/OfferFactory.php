<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_id' => 1,
            'title' => $this->faker->sentence(),
            'discount' => $this->faker->numberBetween(5, 50),
            'start' => now(),
            'end' => now()->addDays(7),
        ];
    }
}
