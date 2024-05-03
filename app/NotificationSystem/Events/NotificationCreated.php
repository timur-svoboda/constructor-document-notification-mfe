<?php
 
namespace App\NotificationSystem\Events;
 
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\NotificationSystem\Resources\NotificationResource;
 
class NotificationCreated implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public NotificationResource $notificationResource,
    ) {}

    public function broadcastOn(): array {
        return [
            new Channel('notificationSystem.notifications'),
        ];
    }

    public function broadcastAs(): string {
        return 'notificationCreated';
    }
}