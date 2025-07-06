<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductVariation;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory()
            ->count(30)
            ->create()
            ->each(function ($product) {
                ProductVariation::factory()->count(3)->create([
                    'product_id' => $product->id,
                ]);
            });
    }
}
