<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\BusinessProfile;
use App\Models\Equipment;

class EquipmentController extends Controller
{
    public function storeEquipmentProvider(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
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

       $equipments = $request->input('equipments', []);

        foreach ($equipments as $eq) {
            Equipment::create([
                'provider_id' => $businessProfile->id,  // link to provider
                'title' => $eq['title'],
                'price' => $eq['price'],
                'quantity' => $eq['quantity'],
                'image' => $eq['image'],
            ]);
        }

        
    
        DB::commit();
         return response()->json([
            'message' => 'Provider and equipments created successfully',], 201);
            } catch (\Exception $e) {

                DB::rollback();
                return response()->json([
                    'error' => 'Failed to create provider and equipments',
                    'details' => $e->getMessage(),
                ], 500);
            }
      }

  public function addEquipment(Request $request){
    DB::beginTransaction();
    try {
        $user = $request->user();
        $businessProfile = BusinessProfile::where('user_id', $user->id)->first();

        if (!$businessProfile) {
            return response()->json(['error' => 'Business profile not found.'], 404);
        }
        $equipment = Equipment::create([
            'provider_id' => $businessProfile->id,
            'title' => $request->input('title'),
            'price' => $request->input('price'),
            'quantity' => $request->input('quantity'),
            'image' => $request->input('image'),
        ]);
        DB::commit();
        return response()->json($equipment);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }

}


public function update(Request $request, $id)
{
    // 1. Find the space
    $equipment = Equipment::findOrFail($id);
     $equipment->update([
        'title' => $request->input('title'),
        'price' => $request->input('price'),
        'quantity' => $request->input('quantity'),
    ]);
     return response()->json([
        'equipment' => $equipment,
    ]);
}
}