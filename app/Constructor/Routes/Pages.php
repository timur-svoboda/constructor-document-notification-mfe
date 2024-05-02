<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Constructor/Pages/Src/Lib/HomePage/HomePage'));
Route::get('/template', fn () => Inertia::render('Constructor/Pages/Src/Lib/TemplatePage/TemplatePage'));
