<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\NotificationSystem\Models\Notification;
use App\NotificationSystem\Resources\NotificationResource;

class FetchNotifications {
    use AsAction;

    public function handle(string | null $resourceId, bool | null $isRead) {
        $notifications = Notification::query()
            ->when($resourceId, fn ($query) => $query->where('resourceId', $resourceId))
            ->when($isRead !== null, fn ($query) => $query->where('isRead', $isRead))
            ->get();

        return NotificationResource::collection($notifications);
    }

    public function rules() {
        return [
            'resourceId' => ['uuid'],
            'isRead' => ['boolean'],
        ];
    }

    public function prepareForValidation(ActionRequest $request): void {
        if ($request->get('isRead')) {
            $request->merge(['isRead' => $request->get('isRead') === 'true']);
        }
    }

    public function asController(ActionRequest $request) {
        return $this->handle(
            resourceId: $request->get('resourceId'),
            isRead: $request->get('isRead'),
        );
    }
}