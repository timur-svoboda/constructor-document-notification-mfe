<?php
 
namespace App\NotificationSystem\Resources;
 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
 
class Resource extends JsonResource {
    public function __construct(...$parameters) {
        parent::__construct(...$parameters);

        $this->wrap(null);
    }
}