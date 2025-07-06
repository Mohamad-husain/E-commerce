<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{

    public function show()
    {
        $profile = Auth::user()->profile;

        if (!$profile) {
            return response()->json(['message' => 'Profile not found.'], 404);
        }

        return response()->json($profile);
    }


    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        if (!$profile) {
           
            $profile = new Profile(['user_id' => $user->id]);
        }

        $data = $request->validate([
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:50',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|url'
        ]);

        $profile->fill($data);
        $profile->user_id = $user->id;
        $profile->save();

        return response()->json(['message' => 'Profile updated successfully.', 'profile' => $profile]);
    }
}
