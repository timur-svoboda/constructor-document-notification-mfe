<?php
 
namespace App\NotificationSystem\Resources;
 
use Spatie\LaravelData\Data;
 
class StatisticResource extends Data {
    public function __construct(
        public string $id,
        public int $unreadNotificationCount,
    ) {}
}