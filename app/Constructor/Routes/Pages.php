<?php

use Illuminate\Support\Facades\Route;
use App\Constructor\Pages\HomePage;
use App\Constructor\Pages\TemplatePage;

Route::get('/', HomePage::class);
Route::get('/template', TemplatePage::class);
