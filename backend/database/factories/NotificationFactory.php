<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'message' => $this->faker->sentence(),
            'is_read' => false,
        ];
    }
}
