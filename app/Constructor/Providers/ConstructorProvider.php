<?php
 
namespace App\Constructor\Providers;
 
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use App\Documentation\Events\DocumentCreated;
use App\Constructor\Actions\CreateNode;
 
class ConstructorProvider extends ServiceProvider {
    public function register(): void {
        Event::listen(DocumentCreated::class, CreateNode::class);
    }
}