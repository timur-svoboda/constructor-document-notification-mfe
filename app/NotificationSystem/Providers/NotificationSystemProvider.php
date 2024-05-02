<?php
 
namespace App\NotificationSystem\Providers;
 
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use App\Documentation\Events\DocumentCreated;
use App\NotificationSystem\Actions\CreateNotification;
 
class NotificationSystemProvider extends ServiceProvider {
    public function register(): void {
        Event::listen(DocumentCreated::class, CreateNotification::class);
    }
}