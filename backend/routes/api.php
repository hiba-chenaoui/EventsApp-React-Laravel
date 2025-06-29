<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\EquipmentController;

Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
    
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');

Route::post('business-space/create', [SpaceController::class, 'storeBusinessSpace'])
    ->middleware('auth:sanctum')
    ->name('business-space.create');

Route::post('business-space/addSpace', [SpaceController::class, 'addSpace'])
->middleware('auth:sanctum');

Route::get('/amenities', [SpaceController::class, 'aminities']);

Route::middleware('auth:sanctum')->get('business-space/showAllSpaces', [SpaceController::class, 'allSpaces']);

Route::middleware('auth:sanctum')->get('business-space/showSpace', [SpaceController::class, 'show']);

Route::put('/business-space/update/{id}', [SpaceController::class, 'update']);

Route::get('/space/{id}/bookings',[SpaceController::class, 'getBookings'])
    ->middleware('auth:sanctum');


// Equipment Provider Routes
Route::post('equipment-provider/create', [EquipmentController::class, 'storeEquipmentProvider'])
    ->middleware('auth:sanctum');

Route::post('/addEquipment', [EquipmentController::class, 'addEquipment'])
->middleware('auth:sanctum');

Route::put('/equipments/update/{id}', [EquipmentController::class, 'update']);





