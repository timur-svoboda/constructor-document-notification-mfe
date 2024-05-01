<?php
 
namespace App\NotificationSystem\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use App\NotificationSystem\Models\Notification;

class CreateNotification {
    use AsAction;

    public function handle(string $message, string | null $resourceId = null) {
        $notification = new Notification();
        $notification['message'] = $message;
        $notification['resourceId'] = $resourceId;
        $notification->save();
    }

    public function asListener($eventName, ...$parameters): void {
        if ($eventName === 'documentation.documentCreated') {
            $documentResource = $parameters[0];
            
            $this->handle(
                message: 'Document "' . $documentResource->title . '" is created',
                resourceId: $documentResource->id,
            );
        }
    }
}