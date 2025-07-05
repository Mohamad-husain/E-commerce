<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // 1. عرض السلة للمستخدم الحالي
    public function index()
    {
        $items = CartItem::with('product')->where('user_id', Auth::id())->get();
        return response()->json($items);
    }

    public function store(Request $request)
{
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
        'size' => 'nullable|string',
        'color' => 'nullable|string'
    ]);

    $item = CartItem::firstOrNew([
        'user_id' => Auth::id(),
        'product_id' => $request->product_id,
        'size' => $request->size,
        'color' => $request->color,
    ]);

    if (!$item->exists) {
        $item->quantity = $request->quantity;
    } else {
        $item->quantity += $request->quantity;
    }

    $item->save();

    return response()->json(['message' => 'Item added to cart', 'data' => $item], 201);
}

    // 3. تعديل الكمية (زيادة أو نقصان)
    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = CartItem::where('user_id', Auth::id())->findOrFail($id);
        $item->quantity = $request->quantity;
        $item->save();

        return response()->json(['message' => 'Quantity updated', 'data' => $item]);
    }

    // 4. حذف منتج من السلة
    public function destroy($id)
    {
        $item = CartItem::where('user_id', Auth::id())->findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    // 5. تفريغ السلة كاملة (اختياري)
    public function clear()
    {
        CartItem::where('user_id', Auth::id())->delete();
        return response()->json(['message' => 'Cart cleared']);
    }
}
