<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\NotificationSystem\Models\Notification;
use App\NotificationSystem\Resources\StatisticResource;

class FetchStatistics {
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

        return StatisticResource::collect($statistics);
    }

    public function rules() {
        return [
            'ids' => ['required', 'array'],
            'ids.*' => ['uuid'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(
            ids: $request->get('ids'),
        );
    }
}