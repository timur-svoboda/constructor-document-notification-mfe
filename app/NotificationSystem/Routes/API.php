<?php

use Illuminate\Support\Facades\Route;
use App\NotificationSystem\Actions\FetchNotifications;
use App\NotificationSystem\Actions\ReadNotification;
use App\NotificationSystem\Actions\FetchResourceNotificationStatistics;

Route::get('fetchNotifications', FetchNotifications::class);
Route::patch('readNotification', ReadNotification::class);
