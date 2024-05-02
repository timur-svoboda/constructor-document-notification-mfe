<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use App\Documentation\Events\DocumentCreated;
use App\NotificationSystem\Models\Notification;

class CreateNotification {
    use AsAction;

    public function handle(string $message, string | null $resourceId = null) {
        $notification = new Notification();
        $notification->message = $message;
        $notification->resourceId = $resourceId;
        $notification->save();
    }

    public function asListener($event): void {
        if ($event instanceof DocumentCreated) {
            $this->handle(
                message: 'Document "' . $event->documentResource->title . '" is created',
                resourceId: $event->documentResource->id,
            );
        }
    }
}