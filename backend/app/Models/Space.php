<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Space extends Model
{
     use HasFactory;

    protected $fillable = [
        'business_profile_id',
        'name',
        'address',
        'type_of_space',
        'capacity',
        'price_per_hour',
        'price_per_day',
        'description',
        'availability_json',
    ];

    public function businessProfile()
    {
        return $this->belongsTo(BusinessProfile::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'space_amenity');
    }

    public function images()
    {
        return $this->hasMany(SpaceImage::class);
    }
    public function bookings()
    {
        return $this->hasMany(SpaceBooking::class, 'space_id');
    }
}
