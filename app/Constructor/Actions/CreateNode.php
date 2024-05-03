<?php
 
namespace App\Constructor\Actions;

use Illuminate\Support\Facades\Event;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Documentation\Events\DocumentCreated;
use App\Constructor\Events\NodeCreated;
use App\Constructor\Models\Node;
use App\Constructor\Resources\NodeResource;

class CreateNode {
    use AsAction;

    public function handle(string $type, string $resourceId) {
        $node = new Node();
        $node->type = $type;
        $node->resourceId = $resourceId;
        $node->save();

        $nodeResource = NodeResource::from($node);

        Event::dispatch(
            new NodeCreated(
                nodeResource: $nodeResource,
            )
        );
    }

    public function asListener($event): void {
        if ($event instanceof DocumentCreated && $event->requestor === 'constructor') {
            $this->handle(
                type: 'document',
                resourceId: $event->documentResource->id,
            );
        }
    }
}