<?php

use Illuminate\Support\Facades\Route;

Route::prefix('documentation')->group(static function(){
    include base_path('app/Documentation/Routes/API.php');
});

Route::prefix('notificationSystem')->group(static function(){
    include base_path('app/NotificationSystem/Routes/API.php');
});

Route::prefix('constructor')->group(static function(){
    include base_path('app/Constructor/Routes/API.php');
});
