<?php
 
namespace App\NotificationSystem\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
 
class Notification extends Model {
    use HasUuids;
    
    protected $table = 'notificationSystem_notifications';

    public $timestamps = false;

    protected $attributes = [
        'isRead' => false,
    ];
}