<?php

use App\NotificationSystem\Providers\NotificationSystemProvider;
use App\Constructor\Providers\ConstructorProvider;
use App\Shared\Providers\AppServiceProvider;

return [
    NotificationSystemProvider::class,
    ConstructorProvider::class,
    AppServiceProvider::class,
];
