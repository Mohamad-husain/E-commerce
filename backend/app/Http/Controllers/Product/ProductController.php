<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductVariation;

class ProductController extends Controller {
    public function getAllProducts() {
        $products = Product::with('category')->get();

        $products->transform(function ($product) {
            $imagePath = asset('storage/' . $product->image);

            // إضافة خاصية image
            $product->image = $imagePath;

            // إضافة مصفوفة صور (اختياري، يمكنك حذفها لو مش محتاجها)
            $product->images = [$imagePath, $imagePath];

            return $product;
        });

        return response()->json($products);
    }

    public function getProductDetails($id) {
        $product = Product::with(['category', 'variations'])->findOrFail($id);

        $sizes = $product->variations->pluck('size')->unique()->values();
        $colors = $product->variations->pluck('color')->unique()->values();

        $imagePath = asset('storage/' . $product->image);
        $images = [$imagePath];

        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'description' => $product->description,
            'category' => $product->category,
            'sizes' => $sizes,
            'colors' => $colors,
            'images' => $images,
            'image' => $imagePath
        ]);
    }

    public function filterProducts(Request $request) {
        $query = Product::with('category');

        if ($request->has('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }

        if ($request->has('category_id') && $request->category_id != 'All') {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('sizes') && is_array($request->sizes)) {
            $query->whereHas('variations', function ($q) use ($request) {
                $q->whereIn('size', $request->sizes);
            });
        }

        if ($request->has('color')) {
            $query->whereHas('variations', function ($q) use ($request) {
                $q->where('color', $request->color);
            });
        }

        $products = $query->get();

        $products->transform(function ($product) {
            $imagePath = asset('storage/' . $product->image);
            $product->image = $imagePath;
            $product->images = [$imagePath, $imagePath];
            return $product;
        });

        return response()->json($products);
    }

    public function getAllCategories() {
        $categories = Category::all();

        $categories->transform(function ($category) {
            $category->image = $category->image
                ? asset('storage/' . $category->image)
                : asset('images/default-category.png');
            return $category;
        });

        return response()->json($categories);
    }

    public function getProductsByCategory($categoryId) {
        $products = Product::where('category_id', $categoryId)->get();

        $products->transform(function ($product) {
            $imagePath = asset('storage/' . $product->image);
            $product->image = $imagePath;
            $product->images = [$imagePath, $imagePath];
            return $product;
        });

        return response()->json($products);
    }

    public function getAllSizesAndColors()
    {
        $sizes = ProductVariation::pluck('size')->unique()->values();
        $colors = ProductVariation::pluck('color')->unique()->values();

        return response()->json([
            'sizes' => $sizes,
            'colors' => $colors,
        ]);
    }


}
