<?php
 
namespace App\Constructor\Events;
 
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Constructor\Resources\NodeResource;
 
class NodeDeleted implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public NodeResource $nodeResource,
    ) {}

    public function broadcastOn(): array {
        return [
            new Channel('constructor.nodes'),
        ];
    }

    public function broadcastAs(): string {
        return 'nodeDeleted';
    }
}