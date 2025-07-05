<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetCodeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string',
            'address' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
            'role_id' => 2,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully.',
            'user' => $user
        ], 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid login credentials.',
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'User logged in successfully.',
            'token' => $token,
            'user' => $user
        ], 200);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully.'
        ]);
    }


    public function sendResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $code = rand(100000, 999999);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $code, 'created_at' => now()]
        );

        Mail::to($request->email)->send(new ResetCodeMail($code));

        return response()->json([
            'status' => true,
            'message' => 'Reset code sent to your email.'
        ]);
    }


public function verifyResetCode(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:users,email',
        'code' => 'required|string',
    ]);

    $reset = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('token', $request->code)
        ->first();

    if (!$reset) {
        return response()->json([
            'status' => false,
            'message' => 'Invalid or expired reset code.'
        ], 400);
    }


    $newToken = Str::random(64);

    DB::table('password_resets')
        ->where('email', $request->email)
        ->update([
            'token' => $newToken,
            'created_at' => now()
        ]);

    return response()->json([
        'status' => true,
        'message' => 'Code verified successfully.',
        'reset_token' => $newToken
    ]);
}

public function changePassword(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:users,email',
        'reset_token' => 'required|string',
        'new_password' => 'required|string|min:6|confirmed',
    ]);

    $reset = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('token', $request->reset_token)
        ->first();

    if (!$reset) {
        return response()->json([
            'status' => false,
            'message' => 'Invalid or expired reset token.'
        ], 400);
    }

    User::where('email', $request->email)->update([
        'password' => Hash::make($request->new_password)
    ]);

    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json([
        'status' => true,
        'message' => 'Password changed successfully.'
    ]);
}


}
