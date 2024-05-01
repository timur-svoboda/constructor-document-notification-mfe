<?php
 
namespace App\Documentation\Resources;
 
use Illuminate\Http\Request;
 
class DocumentResource extends Resource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
        ];
    }
}