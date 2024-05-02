<?php

use Illuminate\Support\Facades\Route;
use App\NotificationSystem\Actions\FetchNotifications;
use App\NotificationSystem\Actions\ReadNotifications;
use App\NotificationSystem\Actions\FetchResourceNotificationStatistics;
use App\NotificationSystem\Actions\FetchStatistics;

Route::get('fetchNotifications', FetchNotifications::class);
Route::patch('readNotifications', ReadNotifications::class);

Route::get('fetchStatistics', FetchStatistics::class);