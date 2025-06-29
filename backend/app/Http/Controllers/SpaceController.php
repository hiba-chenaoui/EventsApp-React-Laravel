<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\BusinessProfile;
use App\Models\Space;
use App\Models\Amenity;
use Illuminate\Support\Facades\Storage;

class SpaceController extends Controller
{
    public function storeBusinessSpace(Request $request)
    {
       DB::beginTransaction();
       try{

        //1. creating businessProfile
        $businessProfile = BusinessProfile::create([
            'user_id' => $request->user()->id,
            'business_type' => $request->input('business.business_type'),
            'company_name'=> $request->input('business.company_name'),
            'description' => $request->input('business.description'),
           'phone'=> $request->input('business.phone'),
        ]);

        //2. creating space
        $space = Space::create([
            'business_profile_id' => $businessProfile->id,
            'name'=> $request->input('space.name'),
            'description' => $request->input('space.description'),
            'type_of_space' => $request->input('space.type_of_space'),
            'address'=> json_encode($request->input('space.address')),
            'capacity' => $request->input('space.capacity'),
            'availability_json' => json_encode($request->input(('space.availability'))),
            'price_per_hour' => $request->input('space.price_per_hour'),
            'price_per_day'=> $request->input('space.price_per_day'), 
        ]);

        //3.Getting amenities ID's

        $amenities = $request->input('space.amenities');
        $ameniyIds = [];
        foreach($amenities as $amenityName => $selected){
            if($selected){
                //searching for amenity by name
                $amenity = Amenity::where('name', $amenityName)->first();
                if($amenity){
                    $amenityIds[] = $amenity->id;
                }
            }
        }
        //4. attaching amenities to space
        $space->amenities()->sync($amenityIds);

        if ($request->hasFile('space.images')) {
            
        foreach ($request->file('space.images') as $imageFile) {
            $path = $imageFile->store('spaces', 'public');
            $space->images()->create([
                'image_url' => Storage::url($path), // e.g. /storage/spaces/filename.jpg
            ]);
            
        }
       }
        //5. commit transaction
        DB::commit();
        return response()->json(['success' => true, 'business' => $businessProfile, 'space' => $space]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }

       }

    public function aminities(Request $request){
        $amenities = Amenity::all();
        return response()->json(['amenities' => $amenities]);
    }

    public function allSpaces(Request $request)
{
    $user = Auth::user();

    $businessProfile = BusinessProfile::with([
        'spaces.amenities',
        'spaces.images',
    ])->where('user_id', $user->id)->first();

    if (!$businessProfile) {
        return response()->json(['message' => 'No business profile found'], 404);
    }

    // Build the base response with business details
    $response = [
        'business' => [
            'company_name' => $businessProfile->company_name,
            'business_type' => $businessProfile->business_type,
            'description' => $businessProfile->description,
            'phone' => $businessProfile->phone,
        ],
    ];

    // If Space Provider, include spaces
    if ($businessProfile->business_type === 'Space Provider') {
        $spaces = $businessProfile->spaces()->with('amenities')->get();
        $response['spaces'] = $spaces->map(function ($space) {
            return [
                'id' => $space->id,
                'name' => $space->name,
                'type_of_space' => $space->type_of_space,
                'description' => $space->description,
                'address' => json_decode($space->address, true)['address'] ?? null,
                'capacity' => $space->capacity,
                'price_per_hour' => $space->price_per_hour,
                'price_per_day' => $space->price_per_day,
                'amenities' => $space->amenities->pluck('name')->toArray(),
                'images' => $space->images->pluck('image_url')->toArray(),
            ];
        });
    }

    // If Equipment Provider, include equipments
    if ($businessProfile->business_type === 'Equipment Provider') {
        $equipments = $businessProfile->equipments()->get();
        $response['equipments'] = $equipments;
    }

    return response()->json($response);
}

    public function show(Request $request)
    {
        
        $user = Auth::user();

        $businessProfile = BusinessProfile::with([
            'spaces.amenities',
        ])->where('user_id', $user->id)->first();

        if (!$businessProfile) {
            return response()->json(['message' => 'No business profile found'], 404);
        }

        // Format the address and availability 
        $space = $businessProfile->spaces->first(); // Assuming one space for now

        return response()->json([
            'business' => [
                'company_name' => $businessProfile->company_name,
                'business_type' => $businessProfile->business_type,
                'description' => $businessProfile->description,
                'phone' => $businessProfile->phone,
            ],
            'space' => [
                'name' => $space->name,
                'description' => $space->description,
                'type_of_space' => $space->type_of_space,
                'address' => [
                    'street' => $space->address, 
                    'city' => 'N/A', 
                    'state' => 'N/A',
                    'zip' => 'N/A',
                    'country' => 'N/A'
                ],
                'capacity' => $space->capacity,
                'price_per_hour' => $space->price_per_hour,
                'price_per_day' => $space->price_per_day,
                'availability' => json_decode($space->availability_json, true),
                'amenities' => $space->amenities->pluck('name'), 
            ]
        ]);
    }


  public function addSpace(Request $request)
{
    DB::beginTransaction();
    try {
        $user = $request->user();
        $businessProfile = BusinessProfile::where('user_id', $user->id)->first();

        if (!$businessProfile) {
            return response()->json(['error' => 'Business profile not found.'], 404);
        }

        $space = Space::create([
            'business_profile_id' => $businessProfile->id,
            'name' => $request->input('space.name'),
            'description' => $request->input('space.description'),
            'type_of_space' => $request->input('space.type_of_space'),
            'address' => json_encode($request->input('space.address')),
            'capacity' => $request->input('space.capacity'),
            'availability_json' => json_encode($request->input('space.availability')),
            'price_per_hour' => $request->input('space.price_per_hour'),
            'price_per_day' => $request->input('space.price_per_day'),
        ]);

        $amenities = $request->input('space.amenities');
        $amenityIds = [];

        foreach ($amenities as $amenityName => $selected) {
            if ($selected) {
                $amenity = Amenity::where('name', $amenityName)->first();
                if ($amenity) {
                    $amenityIds[] = $amenity->id;
                }
            }
        }

        $space->amenities()->sync($amenityIds);

        DB::commit();
        return response()->json(['success' => true, 'space' => $space]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}

public function update(Request $request, $id)
{
    // 1. Find the space
    $space = Space::findOrFail($id);
     $space->update([
        'name' => $request->input('name'),
        'type_of_space' => $request->input('type_of_space'),
        'capacity' => $request->input('capacity'),
        'price_per_hour' => $request->input('price_per_hour'),
        'price_per_day' => $request->input('price_per_day'),

    ]);
     return response()->json([
        'message' => 'Space updated successfully',
        'space' => $space->load('amenities', 'images'),
    ]);
}

public function getBookings($id)
{
    $space = Space::with('bookings.organizer',  'businessProfile')->findOrFail($id);

    if ($space->businessProfile->user_id !== Auth::id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

   $bookings = $space->bookings->map(function ($booking) {
        return [
            'id' => $booking->id,
            'booking_date' => $booking->booking_date,
            'start_time' => $booking->start_time,
            'end_time' => $booking->end_time,
            'organizer_name' => $booking->organizer->name,
        ];
     });
    return response()->json([
        'space' => $space->name,
        'bookings' => $bookings,
    ]);
 
   }    
   
public function delete($id)
{
    $space = Space::findOrFail($id);

    // Check if the authenticated user is the owner of the space
    if ($space->businessProfile->user_id !== Auth::id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Delete the space and its associated amenities
    $space->amenities()->detach();
    $space->delete();

    return response()->json([
        'message' => 'Space deleted successfully',
    ], 200);
}
}
