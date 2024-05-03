<?php
 
namespace App\Constructor\Actions;

use Illuminate\Support\Facades\Event;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Documentation\Events\DocumentDeleted;
use App\Constructor\Events\NodeDeleted;
use App\Constructor\Models\Node;
use App\Constructor\Resources\NodeResource;

class DeleteNode {
    use AsAction;

    public function handle(string $id) {
        $node = Node::find($id);

        $nodeResource = NodeResource::from($node);
        
        $node->delete();

        Event::dispatch(
            new NodeDeleted(
                nodeResource: $nodeResource,
            )
        );
    }

    public function asListener($event): void {
        if ($event instanceof DocumentDeleted) {
            $node = Node::where('resourceId', $event->documentResource->id)->first();

            if ($node) {
                $this->handle(
                    id: $node->id,
                );
            }
        }
    }
}