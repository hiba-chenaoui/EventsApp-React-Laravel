<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('/', function () {
    return view('welcome');
});


// Route pour tester CORS

Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'CORS fonctionne sans headers manuels !']);
});
