<?php

use Illuminate\Support\Facades\Route;
use App\NotificationSystem\Actions\FetchUnreadNotifications;
use App\NotificationSystem\Actions\ReadNotification;

Route::get('fetchUnreadNotifications', FetchUnreadNotifications::class);
Route::patch('readNotification', ReadNotification::class);