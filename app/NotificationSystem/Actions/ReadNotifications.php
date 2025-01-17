<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\NotificationSystem\Models\Notification;
use App\NotificationSystem\Resources\NotificationResource;

class ReadNotifications {
    use AsAction;

    public function handle(array | null $ids) {
        $notifications = Notification::query()
            ->when($ids, fn ($query) => $query->whereIn('id', $ids))
            ->where('isRead', false)
            ->get();

        foreach ($notifications as $notification) {
            $notification->isRead = true;
            $notification->save();
        }

        UpdateStatistics::make()->handle(
            ids: $notifications->unique('resourceId')->pluck('resourceId')->toArray()
        );

        return NotificationResource::collect($notifications);
    }

    public function rules() {
        return [
            'ids' => ['array'],
            'ids.*' => ['exists:App\NotificationSystem\Models\Notification,id']
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(
            ids: $request->get('ids'),
        );
    }
}