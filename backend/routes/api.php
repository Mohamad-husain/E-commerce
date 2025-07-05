<?php

use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

//Auth
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/forgot-password', [UserController::class, 'sendResetCode']);
Route::post('/send-reset-code', [UserController::class, 'sendResetCode']);
Route::post('/verify-reset-code', [UserController::class, 'verifyResetCode']);
Route::post('/change-password', [UserController::class, 'changePassword']);


//product
Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductController::class, 'getProductDetails']);
Route::get('/filter-products', [ProductController::class, 'filterProducts']);
Route::get('/categories', [ProductController::class, 'getAllCategories']);
Route::get('/categories/{id}/products', [ProductController::class, 'getProductsByCategory']);

Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);


// Admin Dashboard
Route::get('/admin/dashboard/overview', [DashboardController::class, 'overview']);
Route::get('/admin/dashboard/orders-per-month', [DashboardController::class, 'getOrdersPerMonth']);
Route::get('/admin/dashboard/order-status', [DashboardController::class, 'getOrderStatusBreakdown']);
Route::get('/admin/dashboard/users-and-sales', [DashboardController::class, 'getNewUsersAndSales']);
Route::get('/admin/dashboard/latest-orders', [DashboardController::class, 'latestOrders']);
// Admin Product
Route::get('/admin/allProduct', [AdminProductController::class, 'AllProduct']);
Route::get('/admin/showDetails/{id}', [AdminProductController::class, 'showDetails']);
Route::post('/admin/addProduct', [AdminProductController::class, 'AddProduct']);
Route::put('/admin/updateProduct/{id}', [AdminProductController::class, 'UpdateProduct']);
Route::delete('/admin/deleteProduct/{id}', [AdminProductController::class, 'DeleteProduct']);


