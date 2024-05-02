<?php

use Illuminate\Support\Facades\Route;
use App\Constructor\Actions\FetchAllNodes;

Route::get('fetchAllNodes', FetchAllNodes::class);
