<?php
 
namespace App\Documentation\Resources;
 
use Spatie\LaravelData\Data;
 
class DocumentResource extends Data {
    public function __construct(
        public string $id,
        public string $title,
        public string $createdAt,
        public string $updatedAt,
    ) {}
}