<?php
 
namespace App\NotificationSystem\Resources;
 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
 
class NotificationResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'resourceId' => $this->resourceId,
            'isRead' => (bool)$this->isRead,
        ];
    }
}