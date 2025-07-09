<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminProductController extends Controller
{
    public function AllProduct()
    {
        $products = Product::with(['category', 'variations'])->get();
        return response()->json($products);
    }

    public function showDetails($id)
    {
        $product = Product::with(['category', 'variations'])->findOrFail($id);
        return response()->json($product);
    }

    public function AddProduct(Request $request)
    {
        if ($request->has('variations') && is_string($request->variations)) {
            $request->merge([
                'variations' => json_decode($request->variations, true)
            ]);
        }
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'discount'    => 'nullable|numeric|min:0|max:100',
            'status'      => 'nullable|in:Available,Out of Stock',
            'category_id' => 'required|exists:categories,id',
            'variations'  => 'nullable|array',
            'variations.*.color'    => 'required_with:variations|string|max:50',
            'variations.*.size'     => 'required_with:variations|string|max:10',
            'variations.*.quantity' => 'required_with:variations|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($validated);

        if (!empty($validated['variations'])) {
            foreach ($validated['variations'] as $variation) {
                $product->variations()->create($variation);
            }
        }

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product->load('variations')
        ], 201);
    }


    public function UpdateProduct(Request $request, $id)
    {
        $product = Product::with('variations')->findOrFail($id);
        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'price'       => 'sometimes|required|numeric',
            'discount'    => 'nullable|numeric|min:0|max:100',
            'status'      => 'sometimes|required|in:Available,Out of Stock',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
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
            'product' => $product->fresh('variations')
        ]);
    }

    public function DeleteProduct($id)
    {
        $product = Product::with('variations')->findOrFail($id);

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->variations()->delete();
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function UpdateVariations(Request $request, $id)
    {
        $product = Product::with('variations')->findOrFail($id);

        $validated = $request->validate([
            'variations' => 'required|array|min:1',
            'variations.*.id'       => 'required|exists:product_variations,id',
            'variations.*.color'    => 'required|string|max:50',
            'variations.*.size'     => 'required|string|max:10',
            'variations.*.quantity' => 'required|integer|min:0',
        ]);

        foreach ($validated['variations'] as $variationData) {
            $variation = ProductVariation::where('product_id', $product->id)
                ->where('id', $variationData['id'])
                ->first();

            if ($variation) {
                $variation->update([
                    'color'    => $variationData['color'],
                    'size'     => $variationData['size'],
                    'quantity' => $variationData['quantity']
                ]);
            }
        }

        return response()->json([
            'message' => 'Variations updated successfully',
            'variations' => $product->fresh('variations')->variations
        ]);
    }

    public function AddVariation(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'color'    => 'required|string|max:50',
            'size'     => 'required|string|max:10',
            'quantity' => 'required|integer|min:0',
        ]);

        $variation = $product->variations()->create($validated);

        $variation->load('product');

        return response()->json([
            'message' => 'Variation added successfully',
            'variation' => $variation
        ], 201);
    }


    public function DeleteVariation($variationId)
    {
        $variation = ProductVariation::findOrFail($variationId);
        $variation->delete();

        return response()->json(['message' => 'Variation deleted successfully']);
    }

    public function FilterProducts(Request $request)
    {
        $search = $request->query('search');

        $query = Product::with(['category', 'variations']);

        if ($search) {
            $query->where('name', 'like', "%$search%")
                ->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%");
                });
        }

        $filteredProducts = $query->get();

        return response()->json($filteredProducts);
    }

    public function getAllCategories()
    {
        return Category::all();
    }
}
