<?php
 
namespace App\Constructor\Resources;
 
use Illuminate\Http\Request;
 
class NodeResource extends Resource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'resourceId' => $this->resourceId,
        ];
    }
}