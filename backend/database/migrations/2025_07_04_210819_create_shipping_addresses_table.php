
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipping_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('full_name');
            $table->string('city');
            $table->string('postal');
            $table->string('phone');
            $table->string('address');
            $table->string('country');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('shipping_addresses');
    }
};
