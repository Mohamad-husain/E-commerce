<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function overview()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'total_products' => Product::count(),
        ]);
    }

    public function getOrdersPerMonth()
    {
        $orders = Order::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        return response()->json($orders);
    }

    public function getOrderStatusBreakdown()
    {
        $statusCounts = Order::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        return response()->json($statusCounts);
    }

    public function getNewUsersAndSales()
    {
        $data = [];

        for ($i = 3; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('Y-m');
            $label = now()->subMonths($i)->format('M');

            $userCount = DB::table('users')
                ->whereYear('created_at', now()->subMonths($i)->year)
                ->whereMonth('created_at', now()->subMonths($i)->month)
                ->count();

            $salesSum = DB::table('orders')
                ->where('status', 'Completed')
                ->whereYear('created_at', now()->subMonths($i)->year)
                ->whereMonth('created_at', now()->subMonths($i)->month)
                ->sum('total_price');

            $data[] = [
                'month' => $label,
                'new_users' => $userCount,
                'sales' => $salesSum,
            ];
        }

        return response()->json($data);
    }

    public function latestOrders()
    {
        $orders = Order::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'name' => $order->user->name,
                    'date' => $order->created_at->format('Y-m-d'),
                    'total' => $order->total_price,
                    'status' => $order->status,
                ];
            });

        return response()->json($orders);
    }
}
