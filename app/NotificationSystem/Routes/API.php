<?php

use Illuminate\Support\Facades\Route;
use App\NotificationSystem\Actions\FetchNotifications;
use App\NotificationSystem\Actions\ReadNotifications;
use App\NotificationSystem\Actions\FetchResourceNotificationStatistics;

Route::get('fetchNotifications', FetchNotifications::class);
Route::patch('readNotifications', ReadNotifications::class);
