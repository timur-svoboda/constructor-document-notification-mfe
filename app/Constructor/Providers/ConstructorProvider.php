<?php
 
namespace App\Constructor\Providers;
 
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use App\Documentation\Events\DocumentCreated;
use App\Documentation\Events\DocumentDeleted;
use App\Constructor\Actions\CreateNode;
use App\Constructor\Actions\DeleteNode;
 
class ConstructorProvider extends ServiceProvider {
    public function register(): void {
        Event::listen(DocumentCreated::class, CreateNode::class);
        Event::listen(DocumentDeleted::class, DeleteNode::class);
    }
}