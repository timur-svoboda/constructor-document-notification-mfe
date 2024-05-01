<?php
 
namespace App\NotificationSystem\Resources;
 
use Illuminate\Http\Request;
 
class NotificationResource extends Resource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'resourceId' => $this->resourceId,
        ];
    }
}