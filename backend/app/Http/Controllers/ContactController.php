<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    // إرسال رسالة "تواصل معنا"
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'message' => 'required|string|max:1000',
        ]);

        // إذا المستخدم مسجل دخول، بنربط الرسالة فيه
        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        }

        $contact = Contact::create($data);

        return response()->json([
            'message' => 'Message sent successfully.',
            'contact' => $contact,
        ], 201);
    }

    // (اختياري) عرض كل الرسائل - للإدارة فقط
    public function index()
    {
        $contacts = Contact::with('user')->latest()->get();
        return response()->json($contacts);
    }
}
