<?php

use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\SpecialOfferController;
use App\Http\Controllers\Product\WishlistController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\CategoryController;



//Auth
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/forgot-password', [UserController::class, 'sendResetCode']);
Route::post('/send-reset-code', [UserController::class, 'sendResetCode']);
Route::post('/verify-reset-code', [UserController::class, 'verifyResetCode']);
Route::post('/change-password', [UserController::class, 'changePassword']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);


//product
Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductController::class, 'getProductDetails']);
Route::get('/filter-products', [ProductController::class, 'filterProducts']);
Route::get('/categories', [ProductController::class, 'getAllCategories']);
Route::get('/categories/{id}/products', [ProductController::class, 'getProductsByCategory']);





//favorites
//Route::middleware('auth:sanctum')->group(function () {
Route::get('/wishlist', [WishlistController::class, 'index']);
Route::post('/wishlist', [WishlistController::class, 'store']);
Route::delete('/wishlist/{product_id}', [WishlistController::class, 'destroy']);
//});

//add to cart
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);
});

//offer
Route::get('/products-with-offers', [SpecialOfferController::class, 'getProductsWithOffers']);

//order
Route::middleware('auth:sanctum')->get('/my-orders', [OrderController::class, 'myOrders']);


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
Route::put('/admin/updateProduct/{id}/variations', [AdminProductController::class, 'UpdateVariations']);
Route::post('/admin/updateProduct/{id}/variation', [AdminProductController::class, 'AddVariation']);
Route::delete('/admin/updateProduct/{variationId}/variation', [AdminProductController::class, 'DeleteVariation']);
Route::get('/admin/filter-products', [AdminProductController::class, 'FilterProducts']);
Route::get('/admin/categories', [AdminProductController::class, 'getAllCategories']);


// Admin Order
Route::get('/admin/allOrder', [AdminOrderController::class, 'AllOrder']);
Route::get('/admin/detailsOrder/{id}', [AdminOrderController::class, 'DetailsOrder']);
Route::put('/admin/orders/{id}/status', [AdminOrderController::class, 'UpdateStatus']);
Route::delete('/admin/deleteOrders/{id}', [AdminOrderController::class, 'DeleteOrder']);
Route::get('/admin/orders/filter', [AdminOrderController::class, 'OrderFilter']);

// Admin Users
Route::get('/admin/users', [AdminUserController::class, 'getAllUsers']);
Route::delete('/admin/users/{id}', [AdminUserController::class, 'deleteUser']);
Route::put('/admin/users/{id}/toggle-role', [AdminUserController::class, 'toggleRole']);
Route::get('/admin/users/filter', [AdminUserController::class, 'filterUsers']);

//Admin Category
Route::get('/admin/categories', [CategoryController::class, 'index']);
Route::post('/admin/categories', [CategoryController::class, 'store']);
Route::put('/admin/categories/{category}', [CategoryController::class, 'update']);
Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy']);
Route::get('/admin/categories/search', [CategoryController::class, 'searchCategory']);


//profile
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});


//contact
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contact', [ContactController::class, 'index']);

