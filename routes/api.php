<?php

use Illuminate\Support\Facades\Route;

Route::prefix('documentation')->group(static function(){
    include base_path('app/Documentation/Routes/Index.php');
});

Route::prefix('notificationSystem')->group(static function(){
    include base_path('app/NotificationSystem/Routes/Index.php');
});

