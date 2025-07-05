<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function myOrders()
    {
        $user = Auth::user();

        $orders = $user->orders()->with('items.product')->get();

        $data = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'date' => $order->created_at->format('Y-m-d, h:i:s A'),
                'status' => $order->status,
                'items' => $order->items->map(function ($item) {
                    return [
                        'name' => $item->product->name ?? 'Unknown',
                        'image' => $item->product->image ?? '',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'size' => $item->size,
                        'color' => $item->color,
                    ];
                }),
            ];
        });

        return response()->json($data);
    }
}
