<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BusinessProfile extends Model
{
    use HasFactory;
    
     protected $fillable = [
        'user_id',
        'business_type',
        'company_name',
        'description',
        'phone',
     ];


     // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function spaces()
    {
        return $this->hasMany(Space::class);
    }
    
}
