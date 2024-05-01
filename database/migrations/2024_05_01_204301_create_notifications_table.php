<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    public function up(): void {
        Schema::create('notificationSystem_notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('message');
            $table->uuid('resourceId')->nullable();
            $table->boolean('isRead');
        });
    }

    public function down(): void {
        Schema::dropIfExists('notificationSystem_notifications');
    }
};
