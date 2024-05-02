<?php

use Illuminate\Support\Facades\Route;

Route::prefix('constructor')->group(static function(){
    include base_path('app/Constructor/Routes/Pages.php');
});

Route::any('{query}', fn () => redirect('/constructor'))->where('query', '.*');