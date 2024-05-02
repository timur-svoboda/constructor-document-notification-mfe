<?php
 
namespace App\NotificationSystem\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
 
class Notification extends Model {
    use HasUuids;
    
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    
    protected $table = 'notificationSystem_notifications';

    protected $attributes = [
        'isRead' => false,
    ];
}