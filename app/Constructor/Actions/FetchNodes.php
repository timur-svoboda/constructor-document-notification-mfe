<?php
 
namespace App\Constructor\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use App\Constructor\Models\Node;
use App\Constructor\Resources\NodeResource;

class FetchNodes {
    use AsAction;

    public function handle() {
        $nodes = Node::all();
        
        return NodeResource::collect($nodes);
    }

    public function asController() {
        return $this->handle();
    }
}