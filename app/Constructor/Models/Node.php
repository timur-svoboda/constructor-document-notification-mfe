<?php
 
namespace App\Constructor\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
 
class Node extends Model {
    use HasUuids;
    
    protected $table = 'constructor_nodes';

    public $timestamps = false;
}