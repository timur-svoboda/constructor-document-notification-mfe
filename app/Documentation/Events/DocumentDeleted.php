<?php
 
namespace App\Documentation\Events;
 
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Documentation\Resources\DocumentResource;
 
class DocumentDeleted {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public DocumentResource $documentResource,
    ) {}
}