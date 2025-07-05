<?php

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
