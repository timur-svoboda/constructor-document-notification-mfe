<?php
 
namespace App\NotificationSystem\Events;
 
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\NotificationSystem\Resources\StatisticResource;
 
class StatisticsUpdated implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public $statisticResources,
    ) {}

    public function broadcastOn(): array {
        return [
            new Channel('notificationSystem.statistics'),
        ];
    }

    public function broadcastAs(): string {
        return 'statisticsUpdated';
    }
}