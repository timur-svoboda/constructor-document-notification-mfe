<?php
 
namespace App\Shared\Providers;
 
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
 
class AppServiceProvider extends ServiceProvider {
    public function boot(): void {
        JsonResource::withoutWrapping();
    }
}