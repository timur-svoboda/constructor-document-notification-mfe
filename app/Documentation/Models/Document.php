<?php
 
namespace App\Documentation\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
 
class Document extends Model {
    use HasUuids;
    
    protected $table = 'documentation_documents';

    public $timestamps = false;
}