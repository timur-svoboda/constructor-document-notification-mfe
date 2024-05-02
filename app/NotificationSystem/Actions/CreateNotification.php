<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use App\Documentation\Events\DocumentCreated;
use App\Documentation\Events\DocumentUpdated;
use App\Documentation\Events\DocumentDeleted;
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

        if ($event instanceof DocumentUpdated) {
            $this->handle(
                message: 'Document "' . $event->oldDocumentResource->title . '" is renamed into "' . $event->newDocumentResource->title .  '"',
                resourceId: $event->newDocumentResource->id,
            );
        }

        if ($event instanceof DocumentDeleted) {
            $this->handle(
                message: 'Document "' . $event->documentResource->title . '" is deleted',
                resourceId: $event->documentResource->id,
            );
        }
    }
}