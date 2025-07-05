<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function AllOrder()
    {
        $orders = Order::with(['user', 'items.product'])->get();

        $data = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'customer' => $order->user->name,
                'date' => $order->created_at->toDateString(),
                'total' => $order->total_price,
                'status' => $order->status,
                'items' => $order->items->map(function ($item) {
                    return [
                        'name' => $item->product->name ?? 'Unknown Product',
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

    public function detailsOrder($id)
    {
        $order = Order::with(['user', 'items.product'])->findOrFail($id);

        $data = [
            'id' => $order->id,
            'customer' => $order->user->name,
            'date' => $order->created_at->toDateString(),
            'total' => $order->total_price,
            'status' => $order->status,
            'items' => $order->items->map(function ($item) {
                return [
                    'name' => $item->product->name ?? 'Unknown Product',
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'size' => $item->size,
                    'color' => $item->color,
                ];
            }),
        ];

        return response()->json($data);
    }

    public function UpdateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Processing,Shipped,Delivered,Cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order,
        ]);
    }

    public function DeleteOrder($id)
    {
        $order = Order::findOrFail($id);
        $order->items()->delete();
        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully',
        ]);
    }
}
