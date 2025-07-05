<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Carbon;

class SpecialOfferController extends Controller
{
    // جلب المنتجات المرتبطة بفئات فيها عروض فعالة
    public function getProductsWithOffers()
    {
        $now = Carbon::now();

        $products = Product::whereHas('category.offers', function ($query) use ($now) {
            $query->where('start', '<=', $now)
                  ->where('end', '>=', $now);
        })
        ->with([
            'category',
            'category.offers' => function ($query) use ($now) {
                $query->where('start', '<=', $now)
                      ->where('end', '>=', $now);
            }
        ])
        ->get();

        return response()->json($products);
    }
}
