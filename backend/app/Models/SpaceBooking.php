<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceBooking extends Model
{
    use HasFactory;

    protected $table = 'space_bookings';
    protected $fillable = [
        'space_id',
        'organizer_id',
        'booking_date',
        'start_time',
        'end_time',
    ];
    

    // Relationships

    public function space()
    {
        return $this->belongsTo(Space::class, 'space_id');
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }
    
}