<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    use HasFactory;

    protected $table = 'shipping_addresses';

    protected $fillable = [
        'order_id',
        'full_name',
        'city',
        'postal',
        'phone',
        'address',
        'country'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
