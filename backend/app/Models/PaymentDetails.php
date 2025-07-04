<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentDetails extends Model
{
    use HasFactory;

    protected $table = 'payment_details';

    protected $fillable = [
        'order_id',
        'method',
        'transaction_id',
        'status'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
