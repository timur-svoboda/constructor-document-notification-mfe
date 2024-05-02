<?php

use Illuminate\Support\Facades\Route;
use App\Constructor\Actions\FetchNodes;

Route::get('fetchNodes', FetchNodes::class);
