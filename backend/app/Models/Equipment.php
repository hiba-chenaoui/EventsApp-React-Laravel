<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Equipment extends Model
{
    use HasFactory;
    protected $table = 'equipments';

    protected $fillable = [
        'provider_id',
        'title',
        'price',
        'quantity',
        'image'
    ];

    public function business()
    {
        return $this->belongsTo(BusinessProfile::class); 
    }
}
