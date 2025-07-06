<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

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

    public function getOrdersPerMonth(Request $request)
    {
        $range = $request->query('range', 'Last Month');
        $query = Order::query();
        switch ($range) {
            case 'Today':
                $query->whereDate('created_at', Carbon::today());
                $groupFormat = '%Y-%m-%d';
                break;

            case 'Last Week':
                $query->whereBetween('created_at', [
                    Carbon::now()->subWeek()->startOfWeek(),
                    Carbon::now()->subWeek()->endOfWeek()
                ]);
                $groupFormat = '%Y-%m-%d';
                break;

            case 'Last Month':
            default:
                $query->whereMonth('created_at', now()->subMonth()->month)
                    ->whereYear('created_at', now()->subMonth()->year);
                $groupFormat = '%M'; // Month name like "April"
                break;
        }

        $orders = $query->selectRaw("DATE_FORMAT(created_at, '{$groupFormat}') as label, COUNT(*) as count")
            ->groupBy('label')
            ->orderBy('label')
            ->get();

        return response()->json($orders);
    }

    public function getOrderStatusBreakdown(Request $request)
    {
        $range = $request->query('range', 'Last Month');
        $query = Order::query();

        switch ($range) {
            case 'Today':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'Last Week':
                $query->whereBetween('created_at', [
                    Carbon::now()->subWeek()->startOfWeek(),
                    Carbon::now()->subWeek()->endOfWeek()
                ]);
                break;
            case 'Last Month':
            default:
                $query->whereMonth('created_at', now()->subMonth()->month)
                    ->whereYear('created_at', now()->subMonth()->year);
                break;
        }
        $statusCounts = $query->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();
        return response()->json($statusCounts);
    }

    public function getNewUsersAndSales(Request $request)
    {
        $range = $request->query('range', 'Last Month');
        $data = [];
        switch ($range) {
            case 'Today':
                $label = now()->format('M d');
                $userCount = DB::table('users')->whereDate('created_at', now())->count();
                $salesSum = DB::table('orders')
                    ->where('status', 'Completed')
                    ->whereDate('created_at', now())
                    ->sum('total_price');
                $data[] = ['label' => $label, 'new_users' => $userCount, 'sales' => $salesSum];
                break;

            case 'Last Week':
                for ($i = 6; $i >= 0; $i--) {
                    $date = now()->subDays($i);
                    $label = $date->format('D');
                    $userCount = DB::table('users')->whereDate('created_at', $date)->count();
                    $salesSum = DB::table('orders')
                        ->where('status', 'Completed')
                        ->whereDate('created_at', $date)
                        ->sum('total_price');
                    $data[] = ['label' => $label, 'new_users' => $userCount, 'sales' => $salesSum];
                }
                break;

            case 'Last Month':
            default:
                for ($i = 3; $i >= 0; $i--) {
                    $month = now()->subMonths($i);
                    $label = $month->format('M');
                    $userCount = DB::table('users')
                        ->whereYear('created_at', $month->year)
                        ->whereMonth('created_at', $month->month)
                        ->count();
                    $salesSum = DB::table('orders')
                        ->where('status', 'Completed')
                        ->whereYear('created_at', $month->year)
                        ->whereMonth('created_at', $month->month)
                        ->sum('total_price');
                    $data[] = ['label' => $label, 'new_users' => $userCount, 'sales' => $salesSum];
                }
                break;
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
