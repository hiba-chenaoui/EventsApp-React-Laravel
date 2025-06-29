<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'location',
        'organizer_id',
        'image'
    ];

    // The event belongs to an organizer
    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }
}
