<?php
 
namespace App\Documentation\Resources;
 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
 
class DocumentResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
        ];
    }
}