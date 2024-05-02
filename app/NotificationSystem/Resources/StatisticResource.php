<?php
 
namespace App\NotificationSystem\Resources;
 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
 
class StatisticResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this['id'],
            'unreadNotificationCount' => $this['unreadNotificationCount'],
        ];
    }
}