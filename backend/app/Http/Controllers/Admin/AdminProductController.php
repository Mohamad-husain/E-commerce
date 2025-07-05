<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminProductController extends Controller
{
    public function AllProduct()
    {
        $products = Product::with('category')->get();
        return response()->json($products);
    }

    public function showDetails($id)
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    public function AddProduct(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'image'       => 'nullable|image|max:2048',
            'discount'    => 'nullable|numeric|min:0|max:100',
            'size'        => 'nullable|string|max:10',
            'color'       => 'nullable|string|max:50',
            'status'      => 'nullable|in:Available,Out of Stock',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = $imagePath;
        }

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }

    public function UpdateProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'price'       => 'sometimes|required|numeric',
            'discount'    => 'sometimes|numeric|min:0|max:100',
            'size'        => 'sometimes|string|max:10',
            'color'       => 'sometimes|string|max:50',
            'status'      => 'sometimes|required|in:Available,Out of Stock',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
        ]);
    }

    public function DeleteProduct($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
