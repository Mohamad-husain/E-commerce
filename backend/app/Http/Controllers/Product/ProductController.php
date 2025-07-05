<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function getAllProducts()
{
    $products = Product::with('category')->get();
    return response()->json($products);
}
public function getProductDetails($id)
{
    $product = Product::with('category')->findOrFail($id);
    return response()->json($product);
}
public function filterProducts(Request $request)
{
    $query = Product::with('category');

    if ($request->has('name')) {
        $query->where('name', 'LIKE', '%' . $request->name . '%');
    }

    if ($request->has('category_id') && $request->category_id != 'All') {
        $query->where('category_id', $request->category_id);
    }

    if ($request->has('sizes') && is_array($request->sizes)) {
        $query->whereIn('size', $request->sizes);
    }

    if ($request->has('color')) {
        $query->where('color', $request->color);
    }

    return response()->json($query->get());
}
public function getAllCategories()
{
    $categories = Category::all();
    return response()->json($categories);
}
public function getProductsByCategory($categoryId)
{
    $products = Product::where('category_id', $categoryId)->get();
    return response()->json($products);
}



}
