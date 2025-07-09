<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::select('id', 'name', 'email', 'created_at', 'role_id')->get();

        $data = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'registered' => $user->created_at->toDateString(),
                'role' => $user->role_id == 1 ? 'Admin' : 'User',
            ];
        });

        return response()->json($data);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        if ($user->role_id == 1) {
            return response()->json(['message' => 'Cannot delete admin users.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    public function toggleRole($id)
    {
        $user = User::findOrFail($id);

        $user->role_id = $user->role_id == 1 ? 2 : 1;
        $user->save();

        return response()->json([
            'message' => 'User role updated successfully.',
            'new_role' => $user->role_id == 1 ? 'Admin' : 'customer'
        ]);
    }


    public function filterUsers(Request $request)
    {
        $search = $request->query('search');

        $users = User::select('id', 'name', 'email', 'created_at', 'role_id')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->get();

        return response()->json($users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'registered' => $user->created_at->toDateString(),
                'role' => $user->role_id == 1 ? 'Admin' : 'User',
            ];
        }));
    }

}
