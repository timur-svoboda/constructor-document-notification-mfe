<?php
 
namespace App\NotificationSystem\Actions;

use Illuminate\Support\Facades\Event;
use Lorisleiva\Actions\Concerns\AsAction;
use App\NotificationSystem\Models\Notification;
use App\NotificationSystem\Resources\StatisticResource;
use App\NotificationSystem\Events\StatisticsUpdated;

class UpdateStatistics {
    use AsAction;

    public function handle(array $ids) {
        $statistics = collect();

        foreach ($ids as $id) {
            $notifications = Notification::query()
                ->where('resourceId', $id)
                ->get();
        
            $statistics->push([
                'id' => $id,
                'unreadNotificationCount' => $notifications
                    ->filter(fn ($notification) => !$notification->isRead)
                    ->count()
            ]);
        }

        Event::dispatch(
            new StatisticsUpdated(
                statisticResources: StatisticResource::collect($statistics),
            )
        );
    }
}