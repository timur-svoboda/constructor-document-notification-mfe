<?php
 
namespace App\Constructor\Resources;
 
use Spatie\LaravelData\Data;
 
class NodeResource extends Data {
    public function __construct(
        public string $id,
        public string $type,
        public string $resourceId,
        public string $createdAt,
        public string $updatedAt,
    ) {}
}