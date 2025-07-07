<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\WishlistItem;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = WishlistItem::with('product')->get();
        return response()->json($wishlist);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $item = WishlistItem::firstOrCreate([
            'user_id' => 1,
            'product_id' => $request->product_id
        ]);

        return response()->json(['message' => 'Product added to wishlist', 'data' => $item], 201);
    }

    public function destroy($id)
    {
        $item = WishlistItem::where('user_id', 1)
        ->where('product_id', $id)
            ->first();

        if (!$item) {
            return response()->json(['message' => 'Item not found in wishlist'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Product removed from wishlist']);
    }
}
