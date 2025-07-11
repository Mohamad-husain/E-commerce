<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;

class SpecialOfferController extends Controller
{
    public function getProductsWithOffers()
    {
        $products = Product::where('discount', '>', 0)
            ->with('category')
            ->get();

        $products->transform(function ($product) {
            $product->image = asset('storage/' . $product->image);
            return $product;
        });

        return response()->json($products);
    }
}
