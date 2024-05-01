<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\NotificationSystem\Models\Notification;
use App\NotificationSystem\Resources\NotificationResource;

class ReadNotification {
    use AsAction;

    public function handle(string $id) {
        $notification = Notification::find($id);
        $notification->isRead = true;
        $notification->save();

        return new NotificationResource($notification);
    }

    public function rules() {
        return [
            'id' => ['required', 'exists:App\NotificationSystem\Models\Notification'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(id: $request->get('id'));
    }
}