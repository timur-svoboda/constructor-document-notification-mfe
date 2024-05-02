<?php
 
namespace App\NotificationSystem\Resources;
 
use Spatie\LaravelData\Data;
 
class NotificationResource extends Data {
    public function __construct(
        public string $id,
        public string $message,
        public ?string $resourceId,
        public bool $isRead,
        public string $createdAt,
        public string $updatedAt,
    ) {}
}