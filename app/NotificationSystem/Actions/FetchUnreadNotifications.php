<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\NotificationSystem\Models\Notification;
use App\NotificationSystem\Resources\NotificationResource;

class FetchUnreadNotifications {
    use AsAction;

    public function handle() {
        $notifications = Notification::query()
            ->where('isRead', false)
            ->get();

        return NotificationResource::collection($notifications);
    }

    public function asController(ActionRequest $request) {
        return $this->handle();
    }
}