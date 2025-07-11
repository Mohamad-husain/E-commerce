<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::latest()->get();

        return response()->json([
            'status' => true,
            'data' => $categories
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $slug = Str::slug($validated['name']);
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/categories', 'public');
        }

        $category = Category::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'image' => $imagePath,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Category created successfully!',
            'data' => $category
        ], 201);
    }


   public function update(Request $request, Category $category)
{
    $request->validate([
    'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
    'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
]);

    $category->name = $request->name;
    $category->slug = Str::slug($request->name);

    if ($request->hasFile('image')) {
        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }
        $category->image = $request->file('image')->store('uploads/categories', 'public');
    }

    $category->save();

    return response()->json([
    'status' => true,
    'message' => 'Category updated successfully!',
    'data' => $category
]);

}



    public function destroy(Category $category)
    {
        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json([
            'status' => true,
            'message' => 'Category deleted successfully!'
        ]);
    }
    public function searchCategory(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
    ]);

    $name = $request->input('name');

    $categories = Category::where('name', 'like', "%$name%")->latest()->get();

    return response()->json([
        'status' => true,
        'data' => $categories
    ]);
}

}
