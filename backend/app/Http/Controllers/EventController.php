<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\SpaceBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class EventController extends Controller
{
    public function store(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string',
            'organizer_id' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg',
            'items' => 'required|json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        // Create event
        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
            'location' => $request->location,
            'organizer_id' => $request->organizer_id,
            'image' => $imagePath,
        ]);

        // Save space bookings
       // Decode items safely
$items = json_decode($request->items, true);

Log::info('Decoded booking items:', $items);

foreach ($items as $item) {
    Log::info('Processing item:', $item);

    if (($item['type'] ?? '') === 'space') {
        try {
            SpaceBooking::create([
                'space_id' => $item['service_id'],
                'organizer_id' => $event->organizer_id,
                'booking_date' => $item['booking_date'] ?? $item['bookingDate'],
                'start_time' => $item['start_time'] ?? $item['bookingStartTime'],
                'end_time' => $item['end_time'] ?? $item['bookingEndTime'],
            ]);
            Log::info('✅ Booking saved for space ID: ' . $item['service_id']);
        } catch (\Exception $e) {
            Log::error('❌ Booking error: ' . $e->getMessage());
        }
    }
}



        return response()->json([
            'message' => 'Event and bookings stored successfully.',
            'event_id' => $event->id,
        ], 201);
    }

    public function index()
{
    $events = Event::where('status', 'Pending')->get();
    return response()->json(['events' => $events]);
}

}


