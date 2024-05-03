<?php
 
namespace App\Constructor\Events;
 
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Constructor\Resources\NodeResource;
 
class NodeDeleted implements ShouldBroadcastNow {
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