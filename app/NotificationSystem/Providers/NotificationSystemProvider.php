<?php
 
namespace App\NotificationSystem\Providers;
 
use Illuminate\Support\Facades\Event;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use App\NotificationSystem\Actions\CreateNotification;
 
class NotificationSystemProvider extends ServiceProvider{
    public function register(): void {
        Event::listen('documentation.documentCreated', CreateNotification::class);
    }
}