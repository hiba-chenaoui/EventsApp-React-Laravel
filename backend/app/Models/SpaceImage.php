<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SpaceImage extends Model
{
     use HasFactory;

    protected $fillable = [
        'space_id',
        'image_url',
        'alt_text',
    ];

    public function space()
    {
        return $this->belongsTo(Space::class);
    }
}
