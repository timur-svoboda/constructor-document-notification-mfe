<?php
 
namespace App\Constructor\Resources;
 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
 
class NodeResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'resourceId' => $this->resourceId,
        ];
    }
}