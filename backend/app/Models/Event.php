<?php

// app/Models/Event.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'date', 'time', 'location', 'status', 'organizer_id', 'category_id', 'image'];

    /**the event belongs to an organizer */
    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    /** the event belongs to a category */

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
