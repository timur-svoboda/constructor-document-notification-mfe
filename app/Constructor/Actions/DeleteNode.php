<?php
 
namespace App\Constructor\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use App\Documentation\Events\DocumentDeleted;
use App\Constructor\Models\Node;

class DeleteNode {
    use AsAction;

    public function handle(string $id) {
        $node = Node::find($id);
        $node->delete();
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